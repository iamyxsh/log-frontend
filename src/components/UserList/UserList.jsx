import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { Paper, FormControlLabel, Checkbox } from "@material-ui/core"
import { Button, Grid, TextField } from "@material-ui/core"
import { useLazyQuery, useMutation } from "@apollo/client"
// import { Edit, SaveAlt } from "@material-ui/icons"

import { LIMIT } from "../../constants/table"
import { CHANGE_ADMIN_STATUS, GET_USERS } from "../../graphql/userGql"
import AddDialogue from "../shared/AddDialogue"

const useStyles = makeStyles({
	table: {
		maxWidth: "98vw",
	},
	num: {
		width: "30vw",
	},
	comm: {
		width: "70vw",
	},
})

export default function UserList() {
	const classes = useStyles()

	const [skip, setSkip] = useState(0)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [edit, setEdit] = useState(null)
	const [term, setTerm] = useState("")
	const [reload, setReload] = useState(false)
	const [data, setData] = useState([])
	const [open, setOpen] = useState(false)

	const [getUsers] = useLazyQuery(GET_USERS, {
		variables: {
			limit: LIMIT,
			skip: skip,
			term,
		},
		onCompleted(res) {
			console.log(res)
			setData(res.getUsers)
		},
		fetchPolicy: "network-only",
	})

	useEffect(() => {
		getUsers()
	}, [reload, getUsers])

	const [updateAdmin] = useMutation(CHANGE_ADMIN_STATUS, {
		onCompleted() {
			setReload((prev) => !prev)
		},
	})

	const handleStatusChange = async (userId, isAdmin) => {
		updateAdmin({ variables: { isAdmin, userId } })
	}

	// const handleEdit = async (userId) => {
	// 	setEdit(null)
	// }

	return (
		<>
			{data.length > 0 && (
				<>
					<Grid
						container
						justify="center"
						alignItems="center"
						style={{ padding: "2rem" }}
						spacing={2}
					>
						<Grid item xs={4}>
							<TextField
								value={term}
								onChange={(e) => setTerm(e.target.value)}
								label="Search by email"
								type="text"
							/>
						</Grid>
						<Grid item xs={12}>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell align="center">Name</TableCell>
											<TableCell align="center">Email</TableCell>
											<TableCell align="center">Password</TableCell>
											<TableCell align="center">Admin</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{data.map((log, ind) => (
											<TableRow key={ind}>
												<TableCell align="center">
													{edit !== ind ? (
														log.name
													) : (
														<TextField
															label="Password"
															value={name}
															onChange={(e) => setPassword(e.target.value)}
														/>
													)}
												</TableCell>
												<TableCell align="center">
													{edit !== ind ? (
														log.password
													) : (
														<TextField
															label="Name"
															value={password}
															onChange={(e) => setName(e.target.value)}
														/>
													)}
												</TableCell>
												<TableCell align="center">
													{edit !== ind ? (
														log.email
													) : (
														<TextField
															label="Email"
															value={email}
															onChange={(e) => setEmail(e.target.value)}
														/>
													)}
												</TableCell>

												<TableCell align="center">
													<FormControlLabel
														control={
															<Checkbox
																checked={log.isAdmin}
																onChange={() =>
																	handleStatusChange(log.id, !log.isAdmin)
																}
															/>
														}
													/>
												</TableCell>
												{/* <TableCell align="center">
													{edit !== ind ? (
														<Edit onClick={() => setEdit(ind)} />
													) : (
														<SaveAlt onClick={() => handleEdit(log.id)} />
													)}
												</TableCell> */}
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
						<Grid item container justify="center" alignItems="center">
							<Grid item xs={2}>
								<Button
									variant="contained"
									style={{ backgroundColor: "#FFFF00" }}
									onClick={() => setSkip(0)}
								>
									First
								</Button>
							</Grid>
							<Grid item xs={2}>
								<Button
									onClick={() => setSkip((prev) => prev - 1)}
									variant="contained"
									color="primary"
									disabled={skip === 0 ? true : false}
								>
									Previous
								</Button>
							</Grid>
							<Grid item xs={2}>
								<Button
									disabled={data.length < LIMIT ? true : false}
									variant="contained"
									color="secondary"
									onClick={() => setSkip((prev) => prev + 1)}
								>
									Next
								</Button>
							</Grid>
							<Grid item>
								<Button
									onClick={() => setOpen(true)}
									variant="contained"
									color="primary"
								>
									Add
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</>
			)}
			<AddDialogue
				reload={reload}
				setReload={(val) => setReload(val)}
				open={open}
				setOpen={(val) => setOpen(val)}
				type="user"
			/>
		</>
	)
}
