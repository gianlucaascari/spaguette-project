import { gql } from '@apollo/client';
import client from './apollo-client';
import { apiServicePlan } from './api-service-plan';
import { apiServiceUser } from './api-service-user';
import { Ingredient, IngredientInput, Recipe, RecipeInput } from '@/types/Catalogue';
import { apiServiceCatalogue } from './api-service-catalogue';



/**
 * API service to fetch and manipulate data from the server
 * @module services/api/api-service
 * @see module:services/data/data-service
 * @see module:types/Catalogue
 */
export const apiService = {
  ... apiServiceCatalogue,
  ... apiServicePlan,
  ... apiServiceUser,
  clearCache: async () => {
    await client.clearStore()
  }
};