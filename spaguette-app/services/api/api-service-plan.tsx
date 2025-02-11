import { gql } from "@apollo/client";
import client from "./apollo-client";
import { List, ListInput, Plan, PlanInput } from "@/types/Plan";

/**
 * Service to interact with the plan of the user
 * @module apiServicePlan
 * @see module:apiService
 */
export const apiServicePlan = {

    /**
     * Get the plan of the user
     * @returns the plan of the user
     * @throws an error if the request fails
     */
    getMyPlan: async (): Promise<Plan> => {
        const response = await client.query<{ getMyPlan: Plan }>({ 
          query: gql`
            query GetMyPlan {
                getMyPlan {
                    recipes {
                        recipe {
                            id
                            name
                            description
                            stepsLink
                            ingredients {
                                quantity
                                ingredient {
                                    id
                                    name
                                    unityOfMeasure
                                }
                            }
                        }
                        numTimes
                    }
                }
            }`
          });
        return response.data.getMyPlan;
    },

    /**
     * Update the plan of the user
     * @param input the new plan
     * @returns the updated plan
     * @throws an error if the request fails
     */
    updatePlan: async (input: PlanInput): Promise<Plan> => {
        const response = await client.mutate<{ updPlan: Plan }>({ 
          mutation: gql`
            mutation UpdPlan($input: PlanInput!) {
              updPlan(input: $input) {
                recipes {
                  recipe {
                    id
                    name
                    description
                    stepsLink
                    ingredients {
                      quantity
                      ingredient {
                        id
                        name
                        unityOfMeasure
                      }
                    }
                  }
                  numTimes
                }
              }
            }`, 
          variables: { input } });
        if(!response.data) throw new Error('No data received from mutation');
        return response.data.updPlan;
    },

    /**
     * Get the list of the user
     * @returns the list of the user
     * @throws an error if the request fails
     */
    getMyList: async ( ignoreCache: boolean ): Promise<List> => {
        const response = await client.query<{ getMyList: List }>({ 
          query: gql`
            query GetMyList {
              getMyList {
                items {
                  ingredient {
                    id
                    name
                    unityOfMeasure
                  }
                  quantity
                  taken
                }
              }
            }`, 
          fetchPolicy: ignoreCache ? 'network-only' : 'cache-first' });
        return response.data.getMyList;
    },

    /**
     * Update the list of the user
     * @param input the new list
     * @returns the updated list
     * @throws an error if the request fails
     */
    updateList: async (input: ListInput): Promise<List> => {
        const response = await client.mutate<{ updList: List }>({ 
          mutation: gql`
            mutation UpdList($input: ListInput!) {
              updList(input: $input) {
                items {
                  ingredient {
                    id
                    name
                    unityOfMeasure
                  }
                  quantity
                  taken
                }
              }
            }`, 
          variables: { input } });
        if(!response.data) throw new Error('No data received from mutation');
        return response.data.updList;
    }
};