import { Ingredient } from "@/types/application/Catalogue";
import { database } from "./database";
import { DbIngredient } from "@/types/database/Catalogue";

const localStorageCatalogueService = {
    getIngredients: async (): Promise<Ingredient[]> => {
        const dbIngredients = await database.get<DbIngredient>("ingredients").query().fetch();
        return dbIngredients.map((i: DbIngredient) => ({
            id: i.remoteId,
            name: i.name,
            unityOfMeasure: i.unityOfMeasure,
        }));
    },
};

export default localStorageCatalogueService;