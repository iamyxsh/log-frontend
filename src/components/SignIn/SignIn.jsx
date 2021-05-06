import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Alert } from "@material-ui/lab"
import CircularProgress from "@material-ui/core/CircularProgress"

import { useMutation } from "@apollo/client"
import { SIGN_IN } from "../../graphql/authGql"
import { useHistory } from "react-router"

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function SignIn() {
	const classes = useStyles()
	const history = useHistory()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")

	const [signin, { loading }] = useMutation(SIGN_IN, {
		update(_, result) {
			localStorage.setItem("user", JSON.stringify(result.data.loginUser.user))
			localStorage.setItem("token", result.data.loginUser.token)

			history.push("/home")
			window.location.reload()
		},
		onError(err) {
			setError(
				err.graphQLErrors[0].extensions.exception.stacktrace[0].split(":")[2]
			)

			setTimeout(() => {
				setError("")
			}, [3000])
		},
		variables: {
			email,
			password,
		},
	})

	const handleSignin = async (e) => {
		e.preventDefault()
		signin()
	}

	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					justifyItems: "center",
					alignItems: "center",
					width: "100vw",
					height: "100vh",
				}}
			>
				<CircularProgress />
			</div>
		)
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Alert
					severity="error"
					style={{
						display: !error ? "none" : undefined,
						width: "100%",
						margin: "1rem 0",
					}}
				>
					{error}
				</Alert>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={(e) => handleSignin(e)}
					>
						Sign In
					</Button>
				</form>
			</div>
		</Container>
	)
}
