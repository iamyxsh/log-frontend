import gql from "graphql-tag"

export const SIGN_IN = gql`
	mutation signin($email: String!, $password: String!) {
		loginUser(loginUserInput: { email: $email, password: $password }) {
			user {
				name
				email
				isAdmin
			}
			token
		}
	}
`
