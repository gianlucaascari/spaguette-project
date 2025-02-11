import { gql } from "@apollo/client";
import client from "./apollo-client";
import { AuthUser, SignInInput, SignUpInput } from "@/types/User";

/**
 * API service for user-related operations
 * @module services/api/api-service-user
 * @see module:services/auth/auth-service
 * @see module:services/auth/AuthContext
 */
export const apiServiceUser = {
  
  /**
   * Sign in the user
   * @param input The sign in input
   * @returns the authenticated user
   * @throws an error if the request fails
   */
  signIn: async (input: SignInInput) => {
      const response = await client.mutate({ 
        mutation: gql`
          mutation SignIn($input: SignInInput!) {
            signIn(input: $input) {
              token
              user {
                id
                email
                name
              }
            }
          }`, 
        variables: { input } })
      if (!response.data) throw new Error('No data received from mutation')
      return response.data.signIn
  },

  /**
   * Sign up the user
   * @param input The sign up input
   * @returns the authenticated user
   * @throws an error if the request fails
   */
  signUp: async (input: SignUpInput) => {
    const response = await client.mutate<{ signUp: AuthUser }>({ 
      mutation: gql`
        mutation SignUp($input: SignUpInput!) {
          signUp(input: $input) {
            token
            user {
              id
              name
              email
            }
          }
        }`, 
      variables: { input } })
    if (!response.data) throw new Error('No data received from mutation')
    return response.data.signUp
  }
}