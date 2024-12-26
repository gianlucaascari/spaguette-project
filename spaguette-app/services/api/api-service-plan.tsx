import { gql } from "@apollo/client";
import client from "./apollo-client";


const GET_MY_PLAN = gql`
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
    }
`;

const UPDATE_PLAN = gql`
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
}
`;

const GET_MY_LIST = gql`
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
}
`;

const UPDATE_LIST = gql`
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
}
`;

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
        const response = await client.query<{ getMyPlan: Plan }>({ query: GET_MY_PLAN });
        return response.data.getMyPlan;
    },

    /**
     * Update the plan of the user
     * @param input the new plan
     * @returns the updated plan
     * @throws an error if the request fails
     */
    updatePlan: async (input: PlanInput): Promise<Plan> => {
        const response = await client.mutate<{ updPlan: Plan }>({ mutation: UPDATE_PLAN, variables: { input } });
        if(!response.data) throw new Error('No data received from mutation');
        return response.data.updPlan;
    },

    /**
     * Get the list of the user
     * @returns the list of the user
     * @throws an error if the request fails
     */
    getMyList: async (): Promise<List> => {
        const response = await client.query<{ getMyList: List }>({ query: GET_MY_LIST });
        return response.data.getMyList;
    },

    /**
     * Update the list of the user
     * @param input the new list
     * @returns the updated list
     * @throws an error if the request fails
     */
    updateList: async (input: ListInput): Promise<List> => {
        const response = await client.mutate<{ updList: List }>({ mutation: UPDATE_LIST, variables: { input } });
        if(!response.data) throw new Error('No data received from mutation');
        return response.data.updList;
    }
};