import { List, Plan } from "@/types/application/Plan";
import { database } from "./database";
import { DbListItem, DbPlanElement } from "@/types/database/DbPlan";
import localStorageCatalogueService from "./local-storage-catalogue-service";
import { Q } from "@nozbe/watermelondb";
import { DbIngredient, DbRecipe } from "@/types/database/DbCatalogue";

/*
* Service to manage the plan related objects in the local storage.
*/
export const localStoragePlanService = {
    /**
     * Get the plan of the user.
     * @returns The plan of the user.
     */
    getMyPlan: async (): Promise<Plan> => {
        const dbPlanElements = await database.get<DbPlanElement>("plan").query().fetch();
        
        return {
            recipes: await Promise.all(dbPlanElements.map(async dbPlanElement => {
                const dbRecipe = await dbPlanElement.recipe.fetch();
                return {
                    recipe: await localStorageCatalogueService.utilities.dbRecipeToRecipe(dbRecipe),
                    numTimes: dbPlanElement.numTimes,
                };
            }))
        }
    },

    /**
     * Update the plan of the user.
     * @param plan The new plan of the user.
     * @returns {Promise<void>}
     */
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

                await database.get<DbPlanElement>("plan").create((dbpe) => {
                    dbpe.recipe.set(dbRecipe[0]);
                    dbpe.numTimes = pe.numTimes;
                });
            }));
        });
    },

    /**
     * Get the list of the user.
     * @returns The list of the user.
     */
    getMyList: async (): Promise<List> => {
        const dbListItems = await database.get<DbListItem>("list").query().fetch();

        return {
            items: await Promise.all(dbListItems.map(async dbListItem => {
                const dbIngredient = await dbListItem.ingredient.fetch();
                return {
                    ingredient: localStorageCatalogueService.utilities.dbIngredientToIngredient(dbIngredient),
                    quantity: dbListItem.quantity,
                    taken: dbListItem.taken,
                };
            })),
        };
    },

    /**
     * Update the list of the user.
     * @param list The new list of the user.
     * @returns {Promise<void>}
     */
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