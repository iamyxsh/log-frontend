import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { TextField, Grid, FormControlLabel, Checkbox } from "@material-ui/core"
import { ADD_LOG } from "../../graphql/logsGql"
import { ADD_USER } from "../../graphql/userGql"
import { useMutation } from "@apollo/client"
import { Alert } from "@material-ui/lab"

export default function AddDialogue({
	open,
	setOpen,
	type,
	reload,
	setReload,
}) {
	const [number, setNumber] = useState("")
	const [log, setLog] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const [isAdmin, setIsAdmin] = useState(false)
	const [error, setError] = useState("")

	const handleClose = () => {
		setOpen(false)
	}

	const [addLogs] = useMutation(ADD_LOG, {
		onCompleted() {
			setOpen(false)
			setReload(!reload)
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
			number: number.toString(),
			log,
		},
	})

	const [addUser] = useMutation(ADD_USER, {
		update(_, result) {
			setOpen(false)
			setReload(!reload)
		},
		onError(err) {
			setError(
				err.graphQLErrors[0].extensions.exception.stacktrace[0].split(":")[2]
			)

			console.log(err)

			setTimeout(() => {
				setError("")
			}, [3000])
		},
		variables: {
			email,
			name,
			password,
			isAdmin,
		},
	})

	const handleAdd = () => {
		if (type !== "user") addLogs()
		if (type === "user") {
			addUser()
		}
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle style={{ color: "blue" }}>ADD</DialogTitle>
			{type === "user" ? (
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} style={{ display: !error ? "none" : undefined }}>
							<Alert severity="error">{error}</Alert>
						</Grid>
						<Grid item xs={12}>
							<TextField
								value={name}
								onChange={(e) => setName(e.target.value)}
								label="Name"
								fullWidth
								type="text"
								error={name.length < 5 || name.length > 20}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								label="Email"
								fullWidth
								type="email"
								error={email.length < 5 || email.length > 20}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								label="Password"
								type="text"
								fullWidth
								error={password.length < 5 || password.length > 20}
							/>
						</Grid>
						<Grid item>
							<FormControlLabel
								control={
									<Checkbox
										checked={isAdmin}
										onClick={() => setIsAdmin((prev) => !prev)}
									/>
								}
								label="Admin"
							/>
						</Grid>
					</Grid>
				</DialogContent>
			) : (
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} style={{ display: !error ? "none" : undefined }}>
							<Alert severity="error">{error}</Alert>
						</Grid>
						<Grid item xs={12}>
							<TextField
								value={number}
								onChange={(e) => setNumber(e.target.value)}
								label="Number"
								fullWidth
								type="number"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								value={log}
								onChange={(e) => setLog(e.target.value)}
								label="Log"
								rows={4}
								multiline={true}
								fullWidth
							/>
						</Grid>
						<Grid item style={{ color: "grey" }}>
							{log.length}/160
						</Grid>
					</Grid>
				</DialogContent>
			)}
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleAdd} color="primary" autoFocus>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	)
}
