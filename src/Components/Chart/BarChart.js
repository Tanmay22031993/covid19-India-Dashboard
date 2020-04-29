import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api/index';
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    ResponsiveContainer,
} from 'recharts';
function CountryWiseCases(allData) {
    return (
        <ResponsiveContainer width="100%" height="80%">
            <BarChart width={730} height={250} data={allData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="xaxisLegend" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="infected" fill="#8884d8" barSize={100} />
                <Bar dataKey="recovered" fill="#82ca9d" barSize={100} />
                <Bar dataKey="deaths" fill="#FF0000" barSize={100} />
            </BarChart>
        </ResponsiveContainer>
    );
}

function CountryBarChart(props) {
    if (props.countryData) {
        const modifiedCountryData = [];
        let tempCountryData = {
            name: 'Infected',
            xaxisLegend: 'Count',
            infected: props.countryData.confirmed.value,
            recovered: props.countryData.recovered.value,
            deaths: props.countryData.deaths.value,
        };
        modifiedCountryData.push(tempCountryData);
        return CountryWiseCases(modifiedCountryData);
    }

    return <h3>Loading...</h3>;
}

export default CountryBarChart;
