/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './App.css';
import Cards from './Components/Analytics/Cards/cards';
import GlobalLineChart from './Components/Analytics/Chart/LineChart';
import CountryBarChart from './Components/Analytics/Chart/BarChart';
import DailyTrendChart from './Components/Analytics/Chart/DailyTrendChart';
import CountryPicker from './Components/Analytics/CountrySelector/countrySelector';
import Precautions from './Components/Precautions/precautions';
import Resources from './Components/Resources/resources';
import Symptom from './Components/Symptomps/symptomp';
import TestCentre from './Components/Testcentres/testCentre';
import { fetchData, fetchCountryData, fetchDailyTrends, fetchStateWiseData } from './api';
import facebookIcon from './Images/facebookIcon.png';
import linkedInIcon from './Images/linkedInIcon.webp';
import loveIcon from './Images/love.png';
import { Divider, Typography, AppBar, Tabs, Tab, Button, Grid } from '@material-ui/core';
import { allViews } from './helper';
import { Money, People, ShowChart, BubbleChart, LocalHospital, Help } from '@material-ui/icons';
class App extends React.Component {
    state = {
        data: {},
        countryData: '',
        //country: { label: 'India', value: 'IND' },
        country: '',
        dailyTrendData: '',
        activeView: 0,
    };
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
    }

    async handleCountryChange(country) {
        const fetchedData = await fetchCountryData(country);
        if (country && country.value === 'IND') {
            let fetchedDailyTrends = await fetchDailyTrends(country);
            //let fetchedStateWiseData = await fetchStateWiseData(country);
            if (fetchedDailyTrends) {
                /* reformatted the dailyconfirmed as recharts expects values in numbers instaed of strings */
                let formattedDailyTrends = fetchedDailyTrends.data.cases_time_series
                    .slice(-7)
                    .map((obj) => {
                        obj['dailyconfirmed'] = parseInt(obj['dailyconfirmed']);
                        obj['dailydeceased'] = parseInt(obj['dailyconfirmed']);
                        obj['dailyrecovered'] = parseInt(obj['dailyrecovered']);
                        return obj;
                    });
                console.log(formattedDailyTrends);
                this.setState({
                    country: country.value,
                    dailyTrendData: formattedDailyTrends,
                });
            }
        }
        if (country) {
            this.setState({ country: country, data: fetchedData.data });
        } else {
            this.setState({ country: '', data: fetchedData.data });
        }
    }

    activeView = (value) => {
        this.setState({ activeView: value });
    };
    showIcon = (i) => {
        switch (i) {
            case 0:
                return <ShowChart className="subnavIcon" />;
            case 1:
                return <People className="subnavIcon" />;
            case 2:
                return <BubbleChart className="subnavIcon" />;
            case 3:
                return <LocalHospital className="subnavIcon" />;
            case 4:
                return <Help className="subnavIcon" />;
            default:
                return null;
        }
    };
    render() {
        const { data, dailyTrendData, country, activeView } = this.state;
        return (
            <div className="parentContainer">
                <div className="header">
                    <Grid
                        container
                        spacing={0}
                        justify="center"
                        alignItems="center"
                        style={{ padding: '1%' }}
                    >
                        <Grid item xs={12} md={9} sm={9}>
                            <span className="branding">covid 19 Dashboard</span>
                        </Grid>
                        <Grid item xs={12} md={3} sm={3} style={{ textAlign: 'center' }}>
                            <Button variant="contained" color="primary" startIcon={<Money />}>
                                Donate
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <div className="subnav">
                    {allViews.map((item, i) => (
                        <a
                            key={i}
                            href="#"
                            className="subnavitems"
                            onClick={() => this.activeView(i)}
                        >
                            {this.showIcon(i)}
                            <span
                                className={
                                    activeView === i
                                        ? 'subnav-innercontainer-selected'
                                        : 'subnavInnerContainer'
                                }
                            >
                                {item}
                            </span>
                        </a>
                    ))}
                </div>
                {/* <div className="banner"> Coming Soon: State wise data for India</div> */}
                {/* <div className="contentArea"> */}
                {activeView === 0 ? (
                    <React.Fragment>
                        <div className="countryPickerContainer">
                            <CountryPicker
                                handleCountryChange={this.handleCountryChange.bind(this)}
                            />
                        </div>
                        <div className="cardContainer">
                            <Cards data={data} />
                        </div>
                        {country.value === 'IND' ? (
                            <div className="trendChartContainer">
                                <DailyTrendChart
                                    dailyTrendData={dailyTrendData}
                                    country={country}
                                />{' '}
                            </div>
                        ) : null}
                        {country ? (
                            <div className="countryChartContainer">
                                <CountryBarChart countryData={data} />
                            </div>
                        ) : null}
                        <div className="globalChartContainer">
                            <GlobalLineChart />
                        </div>
                    </React.Fragment>
                ) : null}
                {activeView === 1 ? <Precautions /> : null}
                {activeView === 2 ? <Symptom /> : null}
                {activeView === 3 ? <TestCentre /> : null}
                {activeView === 4 ? <Resources /> : null}
                {/* </div> */}
                <div className="socialMedia">
                    <a href="https://www.facebook.com/tanmaybiswas.22">
                        <img alt="facebook" src={facebookIcon} width="50" height="50" />
                    </a>
                    <a href="https://www.linkedin.com/in/tanmaybiswas">
                        <img alt="linkedin" src={linkedInIcon} width="50" height="50" />
                    </a>
                </div>
                <div className="pageCredit">
                    <Typography style={{ fontSize: '14px' }} gutterBottom>
                        Made with <img src={loveIcon} className="loveImage" /> in India. Hosted by{' '}
                        <a href="https://www.netlify.com/">Netlify </a> & data visualization by
                        <a href="https://recharts.org"> Recharts.</a>
                    </Typography>
                    <Typography gutterBottom style={{ fontSize: '14px' }}>
                        API Source -{' '}
                        <a href="https://covid19.mathdro.id/api ">
                            https://covid19.mathdro.id/api{' '}
                        </a>{' '}
                        &{' '}
                        <a href="https://api.covid19india.org/ ">https://api.covid19india.org/ </a>
                        <br />
                        Image Source - Google Images &{' '}
                        <a href="https://www.vectorstock.com/">Vector Stock </a>
                    </Typography>
                </div>
            </div>
        );
    }
}

export default App;
