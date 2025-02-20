import { Ingredient } from "@/types/application/Catalogue";
import { database } from "./database";
import { DbIngredient } from "@/types/database/Catalogue";
import { Q } from "@nozbe/watermelondb";

const localStorageCatalogueService = {
    getIngredients: async (): Promise<Ingredient[]> => {
        const dbIngredients = await database.get<DbIngredient>("ingredients").query().fetch();
        return dbIngredients.map((i: DbIngredient) => ({
            id: i.remoteId,
            name: i.name,
            unityOfMeasure: i.unityOfMeasure,
        }));
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
};

export default localStorageCatalogueService;