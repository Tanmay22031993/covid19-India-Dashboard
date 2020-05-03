/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './App.css';
import Cards from './Components/Analytics/Cards/cards';
import GlobalLineChart from './Components/Analytics/Chart/LineChart';
import IndiaBarChart from './Components/Analytics/Chart/IndiaBarChart';
import IndiaTrendChart from './Components/Analytics/Chart/IndiaTrendChart';
import StatePicker from './Components/Analytics/StateSelector/stateSelector';
import StateWiseTable from './Components/Analytics/StateWiseData/stateTable';
import IndiaTimeSeries from './Components/Analytics/Chart/IndiaTimeSeries';
import Resources from './Components/Resources/resources';
import Symptom from './Components/Symptomps/symptomp';
import TestCentre from './Components/Testcentres/testCentre';
import { fetchGlobalData, fetchDailyTrends } from './api';
import facebookIcon from './Images/facebookIcon.png';
import linkedInIcon from './Images/linkedInIcon.webp';
import loveIcon from './Images/love.png';
import { Typography, Button, Grid, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { allViews } from './helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faQuestionCircle,
    faHospitalSymbol,
    faRupeeSign,
    faChartPie,
} from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
    state = {
        cardData: {},
        indiaData: {},
        globalData: {},
        countryData: '',
        country: 'GLOBAL',
        dailyTrendData: '',
        activeView: 0,
        modifiedYTDData: [],
        timeSpan: 'YTD',
    };
    async componentDidMount() {
        const fetchedGlobalData = await fetchGlobalData();
        this.setState({ globalData: fetchedGlobalData, cardData: fetchedGlobalData });
        const fetchedDailyTrends = await fetchDailyTrends();
        const stateWiseData = fetchedDailyTrends.data.statewise;
        const timeSeriesData = fetchedDailyTrends.data.cases_time_series;
        const totalData = fetchedDailyTrends.data.statewise[0];
        const formattedIndiaData = {
            confirmed: totalData.confirmed,
            recovered: totalData.recovered,
            deaths: totalData.deaths,
            lastUpdate: totalData.lastupdatedtime,
        };
        this.setState({
            indiaData: formattedIndiaData,
            stateWiseData: stateWiseData,
            timeSeriesData: timeSeriesData,
            modifiedYTDData: timeSeriesData,
        });
    }

    activeView = (value) => {
        this.setState({ activeView: value });
        if (value === 1) {
            this.setState({ country: 'IND' });
        } else {
            this.setState({ country: 'GLOBAL' });
        }
    };

    showIcon = (i) => {
        switch (i) {
            case 0:
                return <FontAwesomeIcon icon={faChartLine} className="subnavIcon" />;
            case 1:
                return <FontAwesomeIcon icon={faChartPie} className="subnavIcon" />;
            case 2:
                return <FontAwesomeIcon icon={faHospitalSymbol} className="subnavIcon" />;
            case 3:
                return <FontAwesomeIcon icon={faQuestionCircle} className="subnavIcon" />;
            default:
                return null;
        }
    };

    handleRadioChange(e) {
        if (e.target.value === 'GLOBAL') {
            this.setState({ cardData: this.state.globalData });
        } else {
            this.setState({ cardData: this.state.indiaData });
        }
        this.setState({ country: e.target.value });
    }

    handleYTDChange(e) {
        let modifiedYTDData = this.state.timeSeriesData;
        if (e.target.value === 'YTD') {
            this.setState({ modifiedYTDData: modifiedYTDData, timeSpan: e.target.value });
        } else if (e.target.value === '1MONTH') {
            modifiedYTDData = modifiedYTDData.slice(-30);
            this.setState({ modifiedYTDData: modifiedYTDData, timeSpan: e.target.value });
        } else {
            modifiedYTDData = modifiedYTDData.slice(-7);
            this.setState({ modifiedYTDData: modifiedYTDData, timeSpan: e.target.value });
        }
    }
    render() {
        const {
            cardData,
            country,
            activeView,
            stateWiseData,
            timeSeriesData,
            modifiedYTDData,
            timeSpan,
        } = this.state;
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
                        <Grid
                            item
                            xs={12}
                            md={3}
                            sm={3}
                            style={{ textAlign: 'center', padding: '5px' }}
                        >
                            <Button variant="contained" color="primary">
                                <FontAwesomeIcon icon={faRupeeSign} className="subnavIcon" /> Donate
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
                {activeView === 0 ? (
                    <React.Fragment>
                        <div className="dataScopeRadioGroup">
                            <RadioGroup
                                style={{ flexDirection: 'row' }}
                                aria-label="gender"
                                name="country"
                                value={country}
                                onChange={this.handleRadioChange.bind(this)}
                            >
                                <FormControlLabel
                                    value="GLOBAL"
                                    control={<Radio />}
                                    label="Global"
                                />
                                <FormControlLabel value="IND" control={<Radio />} label="India" />
                            </RadioGroup>
                        </div>
                        <div className="cardContainer">
                            <Cards data={cardData} country={country} />
                        </div>
                        <div className="globalChartContainer">
                            <GlobalLineChart timeSeriesData={timeSeriesData} country={country} />
                        </div>
                    </React.Fragment>
                ) : null}
                {activeView === 1 ? (
                    <React.Fragment>
                        {country === 'IND' ? (
                            <div className="trendChartContainer">
                                <IndiaTrendChart timeSeriesData={timeSeriesData} />
                            </div>
                        ) : null}
                        <div className="timeSpan">
                            <RadioGroup
                                style={{ flexDirection: 'row' }}
                                aria-label="gender"
                                name="country"
                                value={timeSpan}
                                onChange={this.handleYTDChange.bind(this)}
                            >
                                <FormControlLabel value="YTD" control={<Radio />} label="YTD" />
                                <FormControlLabel
                                    value="1MONTH"
                                    control={<Radio />}
                                    label="last 1 month"
                                />
                                <FormControlLabel
                                    value="7DAYS"
                                    control={<Radio />}
                                    label="last 7 days"
                                />
                            </RadioGroup>
                        </div>
                        <div className="countryChartContainer">
                            <div className="indiaChart">
                                <IndiaTimeSeries timeSeriesData={modifiedYTDData} />
                            </div>
                            <div className="indiaChart">
                                <IndiaBarChart countryData={stateWiseData} />
                            </div>
                        </div>
                        <div className="stateWiseTable">
                            {/* {country === 'IND' ? (
                                <StatePicker stateWiseData={stateWiseData} />
                            ) : null} */}
                            {country === 'IND' ? (
                                <StateWiseTable stateWiseData={stateWiseData} />
                            ) : null}
                        </div>
                    </React.Fragment>
                ) : null}
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
                        Made with <img src={loveIcon} className="loveImage" /> in India
                    </Typography>
                    <Typography gutterBottom style={{ fontSize: '14px' }}>
                        Credits : Hosted by <a href="https://www.netlify.com/">Netlify </a> , Charts
                        by
                        <a href="https://recharts.org"> Recharts, </a>
                        API Source -{' '}
                        <a href="https://covid19.mathdro.id/api ">
                            https://covid19.mathdro.id/api{' '}
                        </a>{' '}
                        ,{' '}
                        <a href="https://api.covid19india.org/ ">https://api.covid19india.org/ </a>,
                        <br />
                        image Source - Google Images &{' '}
                        <a href="https://www.vectorstock.com/">Vector Stock </a> & icons by{' '}
                        <a href="https://fontawesome.com/ ">FontAwesome</a>
                    </Typography>
                </div>
            </div>
        );
    }
}

export default App;
