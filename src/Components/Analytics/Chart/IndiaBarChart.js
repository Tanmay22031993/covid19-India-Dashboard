import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    ResponsiveContainer,
    PieChart,
    Pie,
} from 'recharts';
function CountryWiseCases(barGraphData) {
    return (
        <React.Fragment>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={730} height={250} data={barGraphData}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="xaxisLegend" />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey="infected" fill="#8884d8" barSize={100} />
                    <Bar dataKey="recovered" fill="#82ca9d" barSize={100} />
                    <Bar dataKey="deaths" fill="#FF0000" barSize={100} />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

function IndiaBarChart(props) {
    if (props.countryData !== undefined) {
        const barGraphData = [];
        let tempCountryData = {
            xaxisLegend: 'Count',
            infected: props.countryData[0].confirmed,
            recovered: props.countryData[0].recovered,
            deaths: props.countryData[0].deaths,
        };
        barGraphData.push(tempCountryData);
        return CountryWiseCases(barGraphData);
    }

    return (
        <React.Fragment>
            <CircularProgress />
            <h5>Loading bar chart...</h5>
        </React.Fragment>
    );
}

export default IndiaBarChart;
