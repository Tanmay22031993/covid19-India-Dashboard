import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { LineChart, Line,Tooltip } from 'recharts';

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
  

function GlobalCases(allData, country) {
    return (
        <React.Fragment>
            <Typography style={{ fontSize: '14px' }}>
                Trends for last 7 days in {country.label}{' '}
                <span style={{ fontSize: '10px', color: '#82ca9d' }}>
                    Last updated on {allData[allData.length - 1].date}{' '}
                </span>
            </Typography>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} md={4} sm={4} style={{height:'100px'}}>
                    <LineChart width={200} height={100} data={allData}>
                    <Tooltip content={<CustomTooltip/>}/>
                        <Line
                            type="monotone"
                            dataKey="dailyconfirmed"
                            stroke="#8884d8"
                            strokeWidth={2}
                        />
                    </LineChart>
                </Grid>
                <Grid item xs={12} md={4} sm={4} style={{height:'100px'}}>
                    <LineChart width={200} height={100} data={allData}>
                    <Tooltip content={<CustomTooltip/>}/>
                        <Line
                            type="monotone"
                            dataKey="dailyrecovered"
                            stroke="#82ca9d"
                            strokeWidth={2}
                        />
                    </LineChart>
                </Grid>
                <Grid item xs={12} md={4} sm={4} style={{height:'100px'}}>
                    <LineChart width={200} height={100} data={allData}>
                    <Tooltip content={<CustomTooltip/>}/>
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

function IndiaTrendChart(props) {
    console.log(props.country);
    return GlobalCases(props.dailyTrendData, props.country);
}

export default IndiaTrendChart;
