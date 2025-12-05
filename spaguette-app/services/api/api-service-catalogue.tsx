import { Ingredient, IngredientInput, Recipe, RecipeInput } from "@/types/Catalogue";
import client from "./apollo-client";
import { gql } from "@apollo/client";

export const apiServiceCatalogue = {

  /**
   * Fetch all ingredients from the database
   * @returns {Promise<Ingredient[]>} A promise that resolves to an array of ingredients
   * @throws {Error} If an error occurs while fetching the ingredients
   */
  getIngredients: async (ignoreCache: boolean): Promise<Ingredient[]> => {
    const response = await client.query<{ getMyIngredients: Ingredient[] }>({ 
      query: gql`
        query GetIngredients {
          getMyIngredients {
            id
            name
            unityOfMeasure
          }
        }
      `, 
      fetchPolicy: ignoreCache ? 'network-only' : 'cache-first'  });
    return response.data.getMyIngredients;
  },
  
  /**
   * Add a new ingredient to the remote database
   * @param {IngredientInput} ingredient The ingredient to add
   * @returns {Promise<Ingredient>} A promise that resolves to the added ingredient
   * @throws {Error} If an error occurs while adding the ingredient
   */
  addIngredient: async (ingredient: IngredientInput): Promise<Ingredient> => {
    const response = await client.mutate<{ addIngredient: Ingredient }>({ 
      mutation: gql`
        mutation AddIngredient($input: IngredientInput) {
          addIngredient(input: $input) {
            id
            name
            unityOfMeasure
          }
        }
      `, 
      variables: { input: ingredient } 
    });
    if (!response.data) throw new Error('No data received from mutation');
    return response.data.addIngredient;
  },
  
  /**
   * Update an ingredient on the remote database
   * @param {string} id The ID of the ingredient to update
   * @param {IngredientInput} ingredient The updated ingredient
   * @returns {Promise<Ingredient>} A promise that resolves to the updated ingredient
   * @throws {Error} If an error occurs while updating the ingredient
   */
  updateIngredient: async (id: string, ingredient: IngredientInput): Promise<Ingredient> => {
    const response = await client.mutate<{ updIngredient: Ingredient }>({ 
    mutation: gql`
      mutation UpdIngredient($id: ID!, $input: IngredientInput) {
        updIngredient(id: $id, input: $input) {
            id
            name
            unityOfMeasure
        }
      }
    `, 
    variables: { id, input: ingredient } 
    });
    if (!response.data) throw new Error('No data received from mutation');
    return response.data.updIngredient;
  },
  
  /**
   * Remove an ingredient from the remote database
   * @param {string} id The ID of the ingredient to remove
   * @returns {Promise<boolean>} A promise that resolves to true if the ingredient was removed
   * @throws {Error} If an error occurs while removing the ingredient
   */
  deleteIngredient: async (id: string): Promise<boolean> => {
    const response = await client.mutate<{ remIngredient: boolean }>({ 
    mutation: gql`
      mutation RemIngredient($remIngredientId: ID!) {
        remIngredient(id: $remIngredientId)
      }
    `, 
    variables: { remIngredientId: id } 
    });
    if (!response.data) throw new Error('No data received from mutation');
    return response.data.remIngredient;
  },
  
  /**
   * Fetch all recipes from the remote database
   * @returns {Promise<Recipe[]>} A promise that resolves to an array of recipes
   * @throws {Error} If an error occurs while fetching the recipes
   */
  getRecipes: async (ignoreCache: boolean): Promise<Recipe[]> => {
    const response = await client.query<{ getMyRecipes: Recipe[] }>({ 
      query: gql`
        query GetMyRecipes {
          getMyRecipes {
            id
            name
            ingredients {
              quantity
              ingredient {
                id
                name
                unityOfMeasure
              }
            }
          }
        }
      `, 
      fetchPolicy: ignoreCache ? 'network-only' : 'cache-first' 
    });
    return response.data.getMyRecipes;
  },


  getRecipe: async (id: string): Promise<Recipe> => {
    const response = await client.query<{ getRecipe: Recipe }>({
      query: gql`
        query GetRecipe($recipeId: ID!) {
          getRecipe(recipeID: $recipeId) {
            id
            name
            stepsLink
            description
            ingredients {
              quantity
              ingredient {
                id
                name
                unityOfMeasure
              }
            }
          }
        }
      `,
      variables: { recipeId: id }
    })

    return response.data.getRecipe
  },
  
  /**
   * Add a new recipe to the remote database
   * @param {RecipeInput} recipe The recipe to add
   * @returns {Promise<Recipe>} A promise that resolves to the added recipe
   * @throws {Error} If an error occurs while adding the recipe
   */
  addRecipe: async (recipe: RecipeInput): Promise<Recipe> => {
    const response = await client.mutate<{ addRecipe: Recipe }>({ 
      mutation: gql`
        mutation AddRecipe($input: RecipeInput!) {
          addRecipe(input: $input) {
            id
            name
            stepsLink
            description
            ingredients {
              ingredient {
                id
                name
                unityOfMeasure
              }
              quantity
            }
          }
        }
      `, 
      variables: { input: recipe } 
    });
    if (!response.data) throw new Error('No data received from mutation');
    return response.data.addRecipe;
  },
  
  /**
   * Update a recipe on the remote database
   * @param {string} id The ID of the recipe to update
   * @param {RecipeInput} recipe The updated recipe
   * @returns {Promise<Recipe>} A promise that resolves to the updated recipe
   * @throws {Error} If an error occurs while updating the recipe
   */
  updateRecipe: async (id: string, recipe: RecipeInput): Promise<Recipe> => {
    const response = await client.mutate<{ updRecipe: Recipe }>({ 
    mutation: gql`
      mutation UpdRecipe($id: ID!, $input: RecipeInput!) {
        updRecipe(id: $id, input: $input) {
          id
          name
          stepsLink
          description
          ingredients {
            ingredient {
              id
              name
              unityOfMeasure
            }
          quantity
          }
        }
      }
    `, 
    variables: { input: recipe, id: id }
    });
    if(!response.data) throw new Error('No data received from mutation');
    return response.data.updRecipe;
  },
  
  /**
   * Remove a recipe from the remote database
   * @param {string} id The ID of the recipe to remove
   * @returns {Promise<boolean>} A promise that resolves to true if the recipe was removed
   * @throws {Error} If an error occurs while removing the recipe
   */
  deleteRecipe: async (id: string): Promise<boolean> => {
    const response = await client.mutate<{ remRecipe: boolean }>({ 
    mutation: gql`
      mutation RemRecipe($remRecipeId: ID!) {
        remRecipe(id: $remRecipeId)
      }
    `, 
    variables: { remRecipeId: id } 
    });
    if (!response.data) throw new Error('No data received from mutation');
    return response.data.remRecipe;
  },
}