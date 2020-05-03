import React, { useState, useEffect } from 'react';
import { fetchGlobalDailyData } from '../../../api/index';
import { Typography } from '@material-ui/core';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
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

function GlobalCases(allData, country) {
    return (
        <React.Fragment>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart
                    // width={730}
                    // height={300}
                    data={allData}
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
                    <Legend verticalAlign="top" />
                    <Line
                        type="monotone"
                        dataKey="confirmed"
                        dot={false}
                        stroke="#8884d8"
                        strokeWidth={3}
                    />
                    <Line
                        type="monotone"
                        dataKey="deaths"
                        dot={false}
                        stroke="#FF0000"
                        strokeWidth={3}
                    />
                    {country === 'IND' ? (
                        <Line
                            type="monotone"
                            dataKey="recovered"
                            dot={false}
                            stroke="#7FD97F"
                            strokeWidth={3}
                        />
                    ) : null}
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

function GlobalLineChart(props) {
    const [dailyData, setDailyData] = useState({});
    let modifiedGlobalData = [];
    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedData = await fetchGlobalDailyData();
            setDailyData(fetchedData.data);
        };
        fetchAPI();
    }, []);

    if (dailyData && dailyData[0]) {
        modifiedGlobalData = dailyData.map((p) => ({
            reportDate: p.reportDate,
            confirmed: p.confirmed.total,
            deaths: p.deaths.total,
        }));
    }
    if (props.country === 'IND' && props.timeSeriesData) {
        modifiedGlobalData = props.timeSeriesData.map((p) => ({
            reportDate: p.date,
            confirmed: parseInt(p.totalconfirmed),
            deaths: parseInt(p.totaldeceased),
            recovered: parseInt(p.totalrecovered),
        }));
    }
    if (modifiedGlobalData.length > 0) {
        return GlobalCases(modifiedGlobalData, props.country);
    }

    return null;
}

export default GlobalLineChart;
