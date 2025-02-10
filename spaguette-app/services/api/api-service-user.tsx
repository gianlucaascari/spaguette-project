import { gql } from "@apollo/client";
import client from "./apollo-client";
import { AuthUser, SignInInput, SignUpInput } from "@/types/User";

const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
      user {
        id
        email
        name
      }
    }
  }
`

const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export const apiServiceUser = {
    signIn: async (input: SignInInput) => {
        const response = await client.mutate({ mutation: SIGN_IN, variables: { input } })
        if (!response.data) throw new Error('No data received from mutation')
        return response.data.signIn
    },
    signUp: async (input: SignUpInput) => {
      const response = await client.mutate<{ signUp: AuthUser }>({ mutation: SIGN_UP, variables: { input } })
      if (!response.data) throw new Error('No data received from mutation')
      return response.data.signUp
    }
}