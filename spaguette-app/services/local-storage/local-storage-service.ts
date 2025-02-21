import localStorageCatalogueService from "./local-storage-catalogue-service";
import { localStoragePlanService } from "./local-storage-plan-service";

/**
 * Service to manage the local storage.
 */
export const localStorageService = {
    ...localStorageCatalogueService,
    ...localStoragePlanService,
}