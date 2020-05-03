import React from 'react';
import { CircularProgress } from '@material-ui/core';
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

function renderCustomAxisTick(props) {
    const { x, y, stroke, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-5)">
                {payload.value}
            </text>
        </g>
    );
}

function showAreaChart(allData, country) {
    let updatedData = allData;

    return (
        <React.Fragment>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={730}
                    height={250}
                    data={updatedData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis
                        dataKey="reportDate"
                        padding={{ left: 20, right: 20 }}
                        tick={renderCustomAxisTick}
                    />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend verticalAlign="top" /> */}
                    <Area
                        type="monotone"
                        dataKey="confirmed"
                        dot={false}
                        stroke="#8884d8"
                        fill="#8884d8"
                        strokeWidth={3}
                    />
                    <Area
                        type="monotone"
                        dataKey="deaths"
                        dot={false}
                        stroke="#FF0000"
                        fill="#FF0000"
                        strokeWidth={3}
                    />
                    <Area
                        type="monotone"
                        dataKey="recovered"
                        dot={false}
                        stroke="#7FD97F"
                        fill="#7FD97F"
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

function IndiaTimeSeries(props) {
    let modifiedData = [];
    if (props.timeSeriesData) {
        modifiedData = props.timeSeriesData.map((p) => ({
            reportDate: p.date,
            confirmed: parseInt(p.totalconfirmed),
            deaths: parseInt(p.totaldeceased),
            recovered: parseInt(p.totalrecovered),
        }));
    }
    if (modifiedData.length > 0) {
        return showAreaChart(modifiedData);
    }

    return (
        <React.Fragment>
            <CircularProgress />
            <h5>Loading area chart...</h5>
        </React.Fragment>
    );
}

export default IndiaTimeSeries;
