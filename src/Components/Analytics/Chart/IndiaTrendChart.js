import React from 'react';
import { Typography, Grid, CircularProgress } from '@material-ui/core';
import { LineChart, Line, Tooltip } from 'recharts';
const CustomTooltip = ({ active, payload }) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${payload[0].payload.date} : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

function IndiaTrendChart(props) {
    let formattedDailyTrends = [];
    if (props.timeSeriesData) {
        /* reformatted the dailyconfirmed as recharts expects values in numbers instaed of strings */
        formattedDailyTrends = props.timeSeriesData.slice(-7).map((obj) => {
            obj['dailyconfirmed'] = parseInt(obj['dailyconfirmed']);
            obj['dailydeceased'] = parseInt(obj['dailyconfirmed']);
            obj['dailyrecovered'] = parseInt(obj['dailyrecovered']);
            return obj;
        });
    }
    if (formattedDailyTrends.length < 1) {
        return (
            <React.Fragment>
                <CircularProgress />
                <h5>Loading trend graphs...</h5>
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
            <Typography>
                Trends for last 7 days{' '}
                <span style={{ fontSize: '10px', color: '#82ca9d' }}>
                    updated till {formattedDailyTrends[formattedDailyTrends.length - 1].date}{' '}
                </span>
            </Typography>
            <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                <Grid item xs={12} md={4} sm={4} style={{ height: '100px' }}>
                    <LineChart width={200} height={100} data={formattedDailyTrends}>
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="dailyconfirmed"
                            stroke="#8884d8"
                            strokeWidth={2}
                        />
                    </LineChart>
                </Grid>
                <Grid item xs={12} md={4} sm={4} style={{ height: '100px' }}>
                    <LineChart width={200} height={100} data={formattedDailyTrends}>
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="dailyrecovered"
                            stroke="#82ca9d"
                            strokeWidth={2}
                        />
                    </LineChart>
                </Grid>
                <Grid item xs={12} md={4} sm={4} style={{ height: '100px' }}>
                    <LineChart width={200} height={100} data={formattedDailyTrends}>
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="dailydeceased"
                            stroke="#FF0000"
                            strokeWidth={2}
                        />
                    </LineChart>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default IndiaTrendChart;
