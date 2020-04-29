import React from 'react';
import './cards.css';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
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
function Cards({ data: { confirmed, recovered, deaths, lastUpdate } }) {
    if (!confirmed) {
        return <h2>Loading...</h2>;
    }
    return (
        <div className="cards">
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} md={4} sm={4}>
                    <Card className="infectedCard" elevation={10}>
                        <CardContent>
                            <Typography gutterBottom>Infected</Typography>
                            <Typography variant="h5" style={{ color: 'rgba(0, 0, 255, 0.8)' }}>
                                <CountUp
                                    start={0}
                                    end={confirmed.value}
                                    duration={2.5}
                                    separator=","
                                />
                            </Typography>
                            <Typography color="textSecondary">
                                {new Date(lastUpdate).toDateString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4} sm={4}>
                    <Card className="recoveredCard" elevation={10}>
                        <CardContent>
                            <Typography gutterBottom> Recovered </Typography>
                            <Typography variant="h5" style={{ color: 'rgba(0, 179, 0, 1)' }}>
                                <CountUp
                                    start={0}
                                    end={recovered.value}
                                    duration={2.5}
                                    separator=","
                                />
                            </Typography>
                            <Typography color="textSecondary">
                                {new Date(lastUpdate).toDateString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4} sm={4}>
                    <Card className="deathsCard" elevation={10}>
                        <CardContent>
                            <Typography gutterBottom> Deaths </Typography>
                            <Typography variant="h5" style={{ color: 'rgba(255, 0, 0, 0.8)' }}>
                                <CountUp
                                    start={0}
                                    end={deaths.value}
                                    duration={2.5}
                                    separator=","
                                />
                            </Typography>
                            <Typography color="textSecondary">
                                {new Date(lastUpdate).toDateString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cards;
