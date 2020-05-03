import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';
// const useStyles = makeStyles({
//     table: {
//         minWidth: 650,
//     },
// });

export default function StateWiseTable(props) {
    // const classes = useStyles();
    const [selectedState, setSelectedState] = useState('');
    const [tableData, setTableData] = useState(props.stateWiseData);
    // useEffect(() => {
    //     const updatedTableData = tableData.filter((p) => p.state === selectedState);
    //     setTableData(updatedTableData);
    // }, [selectedState, tableData]);
    console.log(props.stateWiseData);
    if (!props.stateWiseData) {
        return <h2>Loading Table...</h2>;
    }
    let tempStates = [];

    if (props.stateWiseData) {
        tempStates = props.stateWiseData
            .filter((p) => p.state !== 'Total')
            .map((p) => ({
                value: p.state,
                label: p.state,
            }));
    }

    return (
        <React.Fragment>
            {/* <Select
                //defaultValue={{ label: 'India', value: 'IND' }}
                options={tempStates}
                onChange={(e) => setSelectedState(e.value)}
                isClearable
                placeholder="Select State"
            /> */}
            <TableContainer component={Paper} style={{ maxHeight: '300px' }}>
                <Table stickyHeader size="small" aria-label="simple table">
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
                            <TableRow key={row.state} hover={true}>
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
        </React.Fragment>
    );
}
