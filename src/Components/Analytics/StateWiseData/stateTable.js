import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

// function createData(state, confirmed, recovered, deaths, lastupdatedtime) {
//     return { state, confirmed, recovered, deaths, lastupdatedtime };
// }

export default function StateWiseTable(props) {
    const classes = useStyles();
    console.log(props.stateWiseData);
    if (!props.stateWiseData) {
        return <h2>Loading Table...</h2>;
    }
    // const rows = [
    //     props.stateWiseData.map((p) =>
    //         createData(
    //             props.p.state,
    //             props.p.confirmed,
    //             props.p.recovered,
    //             props.p.deaths,
    //             props.p.lastupdatedtime
    //         )
    //     ),
    // ];
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>State</TableCell>
                        <TableCell align="right">Confirmed</TableCell>
                        <TableCell align="right">Recovered</TableCell>
                        <TableCell align="right">Deaths</TableCell>
                        <TableCell align="right">Last Updated At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.stateWiseData.map((row) => (
                        <TableRow key={row.state}>
                            <TableCell component="th" scope="row">
                                {row.state}
                            </TableCell>
                            <TableCell align="right">{row.confirmed}</TableCell>
                            <TableCell align="right">{row.recovered}</TableCell>
                            <TableCell align="right">{row.deaths}</TableCell>
                            <TableCell align="right">{row.lastupdatedtime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
