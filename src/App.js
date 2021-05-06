// import {  } from "apollo-cache-inmemory"
// import { createHttpLink } from "apollo-link-http"
import { GRAPHQL_URI } from "./constants/env"
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client"
import { setContext } from "apollo-link-context"

import MainRouter from "./MainRouter"

const httpLink = createHttpLink({
	uri: GRAPHQL_URI,
})

const authLink = setContext(() => {
	const token = localStorage.getItem("token")

	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
		},
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})

const App = () => {
	return <MainRouter />
}

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)
