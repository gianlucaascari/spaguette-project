import localStorageCatalogueService from "./local-storage-catalogue-service";
import { localStoragePlanService } from "./local-storage-plan-service";

export const localStorageService = {
    ...localStorageCatalogueService,
    ...localStoragePlanService,
}