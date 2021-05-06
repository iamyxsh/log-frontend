import gql from "graphql-tag"

export const GET_USERS = gql`
	query getUsers($limit: Int!, $skip: Int!, $term: String) {
		getUsers(limit: $limit, skip: $skip, term: $term) {
			id
			email
			name
			password
			createdAt
			isAdmin
		}
	}
`
export const CHANGE_ADMIN_STATUS = gql`
	mutation updateAdminInfo($isAdmin: Boolean!, $userId: String!) {
		updateAdminInfo(
			updateAdminInfoInput: { isAdmin: $isAdmin, userId: $userId }
		) {
			isAdmin
		}
	}
`

export const EDIT_USER_PROFILE = gql`
	mutation updateAdminInfo($isAdmin: Boolean!, $userId: String!) {
		updateAdminInfo(
			updateAdminInfoInput: { isAdmin: $isAdmin, userId: $userId }
		) {
			isAdmin
		}
	}
`

export const ADD_USER = gql`
	mutation createUser(
		$isAdmin: Boolean!
		$email: String!
		$password: String!
		$name: String!
	) {
		createUser(
			createUserInput: {
				isAdmin: $isAdmin
				email: $email
				password: $password
				name: $name
			}
		) {
			isAdmin
		}
	}
`
