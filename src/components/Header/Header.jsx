import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { useHistory } from "react-router"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}))

export default function Header() {
	const classes = useStyles()
	const history = useHistory()

	const token = localStorage.getItem("token")
	const user = localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: {}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Logs
					</Typography>
					<Button
						style={{ display: token ? "inline-block" : "none" }}
						color="inherit"
						onClick={() => history.push("/home")}
					>
						Logs Page
					</Button>
					<Button
						style={{ display: user.isAdmin ? "inline-block" : "none" }}
						color="inherit"
						onClick={() => history.push("/admin/users")}
					>
						Admin Panel
					</Button>
					<Button
						style={{ display: !token ? "none" : undefined }}
						color="inherit"
						onClick={() => {
							localStorage.removeItem("token")
							localStorage.removeItem("user")
							history.push("/")
							window.location.reload()
						}}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}
