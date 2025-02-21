import { Ingredient, Recipe } from "@/types/application/Catalogue";
import { database } from "./database";
import { DbIngredient, DbIngredientQuantity, DbRecipe } from "@/types/database/DbCatalogue";
import { Q } from "@nozbe/watermelondb";

/**
 * Service to manage the catalogue related objects in the local storage.
 */
export const localStorageCatalogueService = {

    /**
     * Get the ingredients of the user.
     * @returns The ingredients of the user.
     */
    getIngredients: async (): Promise<Ingredient[]> => {
        const dbIngredients = await database.get<DbIngredient>("ingredients").query().fetch();
        return dbIngredients.map((i: DbIngredient) => localStorageCatalogueService.utilities.dbIngredientToIngredient(i));
    },

    /**
     * Get an ingredient by its ID.
     * @param {string} id The ID of the ingredient.
     * @returns The ingredient with the given ID or null if it is not found.
     */
    getIngredient: async (id: string): Promise<Ingredient | null> => {
        const dbIngredients = await database.get<DbIngredient>("ingredients").query(Q.where("remote_id", id)).fetch();
        if (dbIngredients.length === 0) {
            return null;
        }

        const i = dbIngredients[0];
        return localStorageCatalogueService.utilities.dbIngredientToIngredient(i);
    },

    /**
     * Add a new ingredient to the user's catalogue.
     * @param {Ingredient} ingredient The ingredient to add.
     * @returns {Promise<void>}
     */
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

    /**
     * Update an ingredient in the user's catalogue.
     * @param {Ingredient} ingredient The updated ingredient.
     * @returns {Promise<void>}
     */
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

    /**
     * Delete an ingredient from the user's catalogue.
     * @param {string} id The ID of the ingredient to delete.
     * @returns {Promise<void>}
     */
    deleteIngredient: async (id: string): Promise<void> => {
        await database.write(async () => {
            const dbIngredient = await database.get<DbIngredient>("ingredients").query(Q.where("remote_id", id)).fetch();
            if (dbIngredient.length === 0) {
                throw new Error("Ingredient not found");
            }

            await dbIngredient[0].destroyPermanently();
        });
    },

    /**
     * Get the recipes of the user.
     * @returns The recipes of the user
     */
    getRecipes: async (): Promise<Recipe[]> => {
        const dbRecipes = await database.get<DbRecipe>("recipes").query().fetch();
        return await Promise.all(dbRecipes.map(async (r: DbRecipe) => localStorageCatalogueService.utilities.dbRecipeToRecipe(r)));
    },

    /**
     * Get a recipe by its ID.
     * @param {string} id The ID of the recipe.
     * @returns The recipe with the given ID or null if it is not found.
     */
    getRecipe: async (id: string): Promise<Recipe | null> => {
        const dbRecipes = await database.get<DbRecipe>("recipes").query(Q.where("remote_id", id)).fetch();
        if (dbRecipes.length === 0) {
            return null;
        }

        const r = dbRecipes[0];
        return await localStorageCatalogueService.utilities.dbRecipeToRecipe(r);
    },

    /**
     * Add a new recipe to the user's catalogue.
     * @param {Recipe} recipe The recipe to add.
     * @returns {Promise<void>}
     */
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

    /**
     * Update a recipe in the user's catalogue.
     * @param {Recipe} recipe The updated recipe.
     * @returns {Promise<void>}
     */
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

    /**
     * Delete a recipe from the user's catalogue.
     * @param {string} id The ID of the recipe to delete.
     * @returns {Promise<void>} 
     */
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
    },

    /**
     * Utilities to convert database objects to application objects.
     */
    utilities: {

        /**
         * Convert a database ingredient to an application ingredient.
         * @param {DbIngredient} dbIngredient The database ingredient.
         * @returns The application ingredient.
         */
        dbIngredientToIngredient: (dbIngredient: DbIngredient): Ingredient => {
            return {
                id: dbIngredient.remoteId,
                name: dbIngredient.name,
                unityOfMeasure: dbIngredient.unityOfMeasure,
            };
        },

        /**
         * Convert a database recipe to an application recipe.
         * @param {DbRecipe} dbRecipe The database recipe.
         * @returns The application recipe.
         */
        dbRecipeToRecipe: async (dbRecipe: DbRecipe): Promise<Recipe> => {
            const ingredientQuantities: DbIngredientQuantity[] = await dbRecipe.ingredientQuantities;
            return {
                id: dbRecipe.remoteId,
                name: dbRecipe.name,
                description: dbRecipe.description,
                stepsLink: dbRecipe.stepsLink,
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
        }
    }
};

export default localStorageCatalogueService;