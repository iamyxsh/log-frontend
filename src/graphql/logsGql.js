import gql from "graphql-tag"

export const GET_LOGS = gql`
	query getLogs($limit: Int!, $skip: Int!, $term: String) {
		getLogs(limit: $limit, skip: $skip, term: $term) {
			id
			number
			comment
		}
	}
`

export const ADD_LOG = gql`
	mutation createLog($number: String!, $log: String!) {
		createLog(createLogInput: { number: $number, comment: $log }) {
			id
			number
			comment
		}
	}
`
