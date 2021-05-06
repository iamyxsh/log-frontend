import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { Button, CircularProgress, Grid, TextField } from "@material-ui/core"
import { useLazyQuery, useQuery } from "@apollo/client"
import { GET_LOGS } from "../../graphql/logsGql"
import { LIMIT } from "../../constants/table"
import AddDialogue from "../shared/AddDialogue"

const useStyles = makeStyles({
	table: {
		maxWidth: "98vw",
	},
})

export default function HomePage() {
	const classes = useStyles()

	const [skip, setSkip] = useState(0)
	const [logs, setLogs] = useState()
	const [term, setTerm] = useState("")
	const [open, setOpen] = useState(false)
	const [reload, setReload] = useState(false)

	const [getLogs] = useLazyQuery(GET_LOGS, {
		onError(err) {
			console.log(err)
		},
		onCompleted(data) {
			setLogs(data)
		},
		fetchPolicy: "network-only",
		variables: {
			limit: LIMIT,
			skip,
			term,
		},
	})

	useEffect(() => {
		getLogs()
	}, [reload])

	// if (loading) {
	// 	return (
	// 		<div
	// 			style={{
	// 				display: "flex",
	// 				justifyItems: "center",
	// 				alignItems: "center",
	// 				width: "100vw",
	// 				height: "100vh",
	// 			}}
	// 		>
	// 			<CircularProgress />
	// 		</div>
	// 	)
	// }

	console.log(logs)

	return (
		<>
			{logs && logs.getLogs.length > 0 && (
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
								label="Search by Number"
								type="number"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12}>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell align="center">Number</TableCell>
											<TableCell align="center">Logs</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{logs.getLogs.map((log, ind) => (
											<TableRow key={ind}>
												<TableCell align="center">{log.number}</TableCell>
												<TableCell align="center">{log.comment}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
						<Grid item container justify="center" alignItems="center">
							<Grid item xs={2}>
								<Button
									onClick={() => setSkip(0)}
									variant="contained"
									style={{ backgroundColor: "#FFFF00" }}
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
									disabled={logs.getLogs.length < 10 ? true : false}
									variant="contained"
									color="secondary"
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
			/>
		</>
	)
}
