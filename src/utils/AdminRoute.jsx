import React from "react"
import { Route, Redirect } from "react-router-dom"

const AdminRoute = ({ component: Component, ...rest }) => {
	const user = localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: {}

	return (
		<Route
			{...rest}
			render={(props) =>
				user.isAdmin ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	)
}

export default AdminRoute
