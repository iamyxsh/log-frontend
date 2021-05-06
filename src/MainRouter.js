import { BrowserRouter, Switch, Route } from "react-router-dom"
import HomePage from "./components/HomePage/HomePage"
import SignIn from "./components/SignIn/SignIn"
import UserList from "./components/UserList/UserList"
import PrivateRoute from "./utils/PrivateRoute"
import AdminRoute from "./utils/AdminRoute"
import Header from "./components/Header/Header"

const MainRouter = () => {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path="/" exact component={SignIn} />
				<PrivateRoute path="/home" exact component={HomePage} />
				<AdminRoute path="/admin/users" exact component={UserList} />
			</Switch>
		</BrowserRouter>
	)
}

export default MainRouter
