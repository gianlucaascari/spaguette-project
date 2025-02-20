import { Ingredient, Recipe } from "@/types/application/Catalogue";
import { database } from "./database";
import { DbIngredient, DbIngredientQuantity, DbRecipe } from "@/types/database/DbCatalogue";
import { Q } from "@nozbe/watermelondb";

export const localStorageCatalogueService = {
    getIngredients: async (): Promise<Ingredient[]> => {
        const dbIngredients = await database.get<DbIngredient>("ingredients").query().fetch();
        return dbIngredients.map((i: DbIngredient) => ({
            id: i.remoteId,
            name: i.name,
            unityOfMeasure: i.unityOfMeasure,
        }));
    },
    getIngredient: async (id: string): Promise<Ingredient | null> => {
        const dbIngredients = await database.get<DbIngredient>("ingredients").query(Q.where("remote_id", id)).fetch();
        if (dbIngredients.length === 0) {
            return null;
        }

        const i = dbIngredients[0];
        return {
            id: i.remoteId,
            name: i.name,
            unityOfMeasure: i.unityOfMeasure,
        };
    },
    addIngredient: async (ingredient: Ingredient): Promise<void> => {
        const existingIngredient = await database.get<DbIngredient>("ingredients").query(Q.where("remote_id", ingredient.id)).fetch();
        if (existingIngredient.length > 0) {
            throw new Error("Ingredient already exists");
        }

        await database.write(async () => {
            await database.get<DbIngredient>("ingredients").create((i) => {
                i.remoteId = ingredient.id;
                i.name = ingredient.name;
                i.unityOfMeasure = ingredient.unityOfMeasure;
            });
        });
    },
    updateIngredient: async (ingredient: Ingredient): Promise<void> => {
        await database.write(async () => {
            const dbIngredient = await database.get<DbIngredient>("ingredients").query(Q.where("remote_id", ingredient.id)).fetch();
            if (dbIngredient.length === 0) {
                throw new Error("Ingredient not found");
            }

            await dbIngredient[0].update((i) => {
                i.name = ingredient.name;
                i.unityOfMeasure = ingredient.unityOfMeasure;
            });
        });
    },
    deleteIngredient: async (id: string): Promise<void> => {
        await database.write(async () => {
            const dbIngredient = await database.get<DbIngredient>("ingredients").query(Q.where("remote_id", id)).fetch();
            if (dbIngredient.length === 0) {
                throw new Error("Ingredient not found");
            }

            await dbIngredient[0].destroyPermanently();
        });
    },
    getRecipes: async (): Promise<Recipe[]> => {
        const dbRecipes = await database.get<DbRecipe>("recipes").query().fetch();
        return await Promise.all(dbRecipes.map(async (r: DbRecipe) => {
            const ingredientQuantities: DbIngredientQuantity[] = await r.ingredientQuantities;
            return {
                id: r.remoteId,
                name: r.name,
                description: r.description,
                stepsLink: r.stepsLink,
                ingredients: await Promise.all(ingredientQuantities.map(async (iq: DbIngredientQuantity) => {
                    const ingredient: DbIngredient = await iq.ingredient;
                    return {
                        ingredient: {
                            id: ingredient.remoteId,
                            name: ingredient.name,
                            unityOfMeasure: ingredient.unityOfMeasure,
                        },
                        quantity: iq.quantity,
                    };
                }))
            };
        }));
    },
    getRecipe: async (id: string): Promise<Recipe | null> => {
        const dbRecipes = await database.get<DbRecipe>("recipes").query(Q.where("remote_id", id)).fetch();
        if (dbRecipes.length === 0) {
            return null;
        }

        const r = dbRecipes[0];
        const ingredientQuantities: DbIngredientQuantity[] = await r.ingredientQuantities;
        return {
            id: r.remoteId,
            name: r.name,
            description: r.description,
            stepsLink: r.stepsLink,
            ingredients: await Promise.all(ingredientQuantities.map(async (iq: DbIngredientQuantity) => {
                const ingredient: DbIngredient = await iq.ingredient;
                return {
                    ingredient: {
                        id: ingredient.remoteId,
                        name: ingredient.name,
                        unityOfMeasure: ingredient.unityOfMeasure,
                    },
                    quantity: iq.quantity,
                };
            })
        )};
    },
    addRecipe: async (recipe: Recipe): Promise<void> => {
        await database.write(async () => {
            const dbRecipe = await database.get<DbRecipe>("recipes").create((r) => {
                r.remoteId = recipe.id;
                r.name = recipe.name;
                if (!!recipe.description) r.description = recipe.description;
                if (!!recipe.stepsLink) r.stepsLink = recipe.stepsLink;
            });

            await Promise.all(recipe.ingredients.map(async (i) => {
                let dbIngredient = await database.get<DbIngredient>("ingredients").query(Q.where("remote_id", i.ingredient.id)).fetch();
                if (dbIngredient.length === 0) {
                    await localStorageCatalogueService.addIngredient(i.ingredient);
                    dbIngredient = await database.get<DbIngredient>("ingredients").query(Q.where("remote_id", i.ingredient.id)).fetch();
                }

                await database.get<DbIngredientQuantity>("ingredient_quantities").create((iq) => {
                    iq.recipe.set(dbRecipe);
                    iq.ingredient.set(dbIngredient[0]);
                    iq.quantity = i.quantity;
                });
            }));
        });
    },
    updateRecipe: async (recipe: Recipe): Promise<void> => {
        await database.write(async () => {
            const dbRecipe = await database.get<DbRecipe>("recipes").query(Q.where("remote_id", recipe.id)).fetch();
            if (dbRecipe.length === 0) {
                throw new Error("Recipe not found");
            }

            await dbRecipe[0].update((r) => {
                r.name = recipe.name;
                if(!!recipe.description) r.description = recipe.description;
                if(!!recipe.stepsLink) r.stepsLink = recipe.stepsLink;
            });

            const dbIngredientQuantities = await dbRecipe[0].ingredientQuantities;
            await Promise.all(dbIngredientQuantities.map(async (iq) => {
                await iq.destroyPermanently();
            }));

            await Promise.all(recipe.ingredients.map(async (i) => {
                let dbIngredient = await database.get<DbIngredient>("ingredients").query(Q.where("remote_id", i.ingredient.id)).fetch();
                if (dbIngredient.length === 0) {
                    await localStorageCatalogueService.addIngredient(i.ingredient);
                    dbIngredient = await database.get<DbIngredient>("ingredients").query(Q.where("remote_id", i.ingredient.id)).fetch();
                }

                await database.get<DbIngredientQuantity>("ingredient_quantities").create((iq) => {
                    iq.recipe.set(dbRecipe[0]);
                    iq.ingredient.set(dbIngredient[0]);
                    iq.quantity = i.quantity;
                });
            }));
        });
    },
    deleteRecipe: async (id: string): Promise<void> => {
        await database.write(async () => {
            const dbRecipe = await database.get<DbRecipe>("recipes").query(Q.where("remote_id", id)).fetch();
            if (dbRecipe.length === 0) {
                throw new Error("Recipe not found");
            }

            const dbIngredientQuantities = await dbRecipe[0].ingredientQuantities;
            await Promise.all(dbIngredientQuantities.map(async (iq) => {
                await iq.destroyPermanently();
            }));

            await dbRecipe[0].destroyPermanently();
        });
    }
};

export default localStorageCatalogueService;