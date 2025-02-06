import { gql } from "@apollo/client";
import client from "./apollo-client";

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

export const apiServiceUser = {
    signIn: async (input: SignInInput) => {
        const response = await client.mutate<{ signIn: AuthUser }>({ mutation: SIGN_IN, variables: input })
        if (!response.data) throw new Error('No data received from mutation')
        return response.data.signIn
    }
}