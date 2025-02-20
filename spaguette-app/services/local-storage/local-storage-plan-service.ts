import { List, Plan } from "@/types/application/Plan";
import { database } from "./database";
import { DbListItem, DbPlanElement } from "@/types/database/DbPlan";
import localStorageCatalogueService from "./local-storage-catalogue-service";
import { Q } from "@nozbe/watermelondb";
import { DbIngredient, DbRecipe } from "@/types/database/DbCatalogue";

export const localStoragePlanService = {
    getMyPlan: async (): Promise<Plan> => {
        const dbPlanElements = await database.get<DbPlanElement>("plan").query().fetch();
        
        return {
            recipes: await Promise.all(dbPlanElements.map(async dbPlanElement => {
                const dbRecipe = await dbPlanElement.recipe.fetch();
                return {
                    recipe: await localStorageCatalogueService._utilities.dbRecipeToRecipe(dbRecipe),
                    numTimes: dbPlanElement.numTimes,
                };
            }))
        }
    },
    updateMyPlan: async (plan: Plan): Promise<void> => {
        await database.write(async () => {
            const dbPlanElements = await database.get<DbPlanElement>("plan").query().fetch();
            await Promise.all(dbPlanElements.map(async (dbPlanElement) => {
                await dbPlanElement.destroyPermanently();
            }));

            await Promise.all(plan.recipes.map(async (pe) => {
                let dbRecipe = await database.get<DbRecipe>("recipes").query(Q.where("remote_id", pe.recipe.id)).fetch();
                if (dbRecipe.length === 0) {
                    await localStorageCatalogueService.addRecipe(pe.recipe);
                    dbRecipe = await database.get<DbRecipe>("recipes").query(Q.where("remote_id", pe.recipe.id)).fetch();
                }

                await database.get<DbPlanElement>("plan").create((pe) => {
                    pe.recipe.set(dbRecipe[0]);
                    pe.numTimes = pe.numTimes;
                });
            }));
        });
    },
    getMyList: async (): Promise<List> => {
        const dbListItems = await database.get<DbListItem>("list").query().fetch();

        return {
            items: await Promise.all(dbListItems.map(async dbListItem => {
                const dbIngredient = await dbListItem.ingredient.fetch();
                return {
                    ingredient: localStorageCatalogueService._utilities.dbIngredientToIngredient(dbIngredient),
                    quantity: dbListItem.quantity,
                    taken: dbListItem.taken,
                };
            })),
        };
    },
    updateMyList: async (list: List): Promise<void> => {
        await database.write(async () => {
            const dbListItems = await database.get<DbListItem>("list").query().fetch();
            await Promise.all(dbListItems.map(async (dbListItem) => {
                await dbListItem.destroyPermanently();
            }));

            await Promise.all(list.items.map(async (li) => {
                let dbIngredient = await database.get<DbIngredient>("ingredients").query(Q.where("remote_id", li.ingredient.id)).fetch();
                if (dbIngredient.length === 0) {
                    await localStorageCatalogueService.addIngredient(li.ingredient);
                    dbIngredient = await database.get<DbIngredient>("ingredients").query(Q.where("remote_id", li.ingredient.id)).fetch();
                }

                await database.get<DbListItem>("list").create((dbli) => {
                    dbli.ingredient.set(dbIngredient[0]);
                    dbli.quantity = li.quantity;
                    dbli.taken = li.taken;
                });
            }));
        });
    }
}