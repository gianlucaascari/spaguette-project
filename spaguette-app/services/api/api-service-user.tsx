import { gql } from "@apollo/client";
import client from "./apollo-client";
import { AuthUser, SignInInput, SignUpInput } from "@/types/User";

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
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
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
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
        const response = await client.mutate({ mutation: SIGN_IN, variables: input })
        if (!response.data) throw new Error('No data received from mutation')
        return response.data.signIn
    },
    signUp: async (input: SignUpInput) => {
      const response = await client.mutate<{ signUp: AuthUser }>({ mutation: SIGN_UP, variables: input })
      if (!response.data) throw new Error('No data received from mutation')
      return response.data.signUp
    }
}