/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './App.css';
import Cards from './Components/Analytics/Cards/cards';
import GlobalLineChart from './Components/Analytics/Chart/LineChart';
import CountryBarChart from './Components/Analytics/Chart/BarChart';
import IndiaTrendChart from './Components/Analytics/Chart/IndiaTrendChart';
import StatePicker from './Components/Analytics/StateSelector/stateSelector';
import StateWiseTable from './Components/Analytics/StateWiseData/stateTable';
import Precautions from './Components/Precautions/precautions';
import Resources from './Components/Resources/resources';
import Symptom from './Components/Symptomps/symptomp';
import TestCentre from './Components/Testcentres/testCentre';
import { fetchGlobalData, fetchCountryData, fetchDailyTrends } from './api';
import facebookIcon from './Images/facebookIcon.png';
import linkedInIcon from './Images/linkedInIcon.webp';
import loveIcon from './Images/love.png';
import {
    Divider,
    Typography,
    AppBar,
    Tabs,
    Tab,
    Button,
    Grid,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    Tooltip,
    IconButton,
} from '@material-ui/core';
import { allViews } from './helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faQuestionCircle,
    faHospital,
    faRupeeSign,
    faChartPie,
} from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
    state = {
        data: {},
        countryData: '',
        //country: { label: 'India', value: 'IND' },
        country: 'GLOBAL',
        dailyTrendData: '',
        activeView: 0,
        optionSelected: 'GLOBAL',
    };
    async componentDidMount() {
        const fetchedGlobalData = await fetchGlobalData();
        this.setState({ data: fetchedGlobalData });
    }

    // async handleCountryChange(country) {
    //     const fetchedData = await fetchCountryData(country);
    //     if (country === 'IND') {
    //         let fetchedDailyTrends = await fetchDailyTrends(country);
    //         //let fetchedStateWiseData = await fetchStateWiseData(country);
    //         if (fetchedDailyTrends) {
    //             /* reformatted the dailyconfirmed as recharts expects values in numbers instaed of strings */
    //             let formattedDailyTrends = fetchedDailyTrends.data.cases_time_series
    //                 .slice(-7)
    //                 .map((obj) => {
    //                     obj['dailyconfirmed'] = parseInt(obj['dailyconfirmed']);
    //                     obj['dailydeceased'] = parseInt(obj['dailyconfirmed']);
    //                     obj['dailyrecovered'] = parseInt(obj['dailyrecovered']);
    //                     return obj;
    //                 });
    //             console.log(formattedDailyTrends);
    //             this.setState({
    //                 country: country,
    //                 dailyTrendData: formattedDailyTrends,
    //             });
    //         }
    //     }
    //     // if (country) {
    //     this.setState({ country: country, data: fetchedData.data });
    //     // } else {
    //     //     this.setState({ country: '', data: fetchedData.data });
    //     // }
    // }

    activeView = (value) => {
        this.setState({ activeView: value });
    };

    showIcon = (i) => {
        switch (i) {
            case 0:
                return <FontAwesomeIcon icon={faChartLine} className="subnavIcon" />;
            case 1:
                return <FontAwesomeIcon icon={faChartPie} className="subnavIcon" />;
            case 2:
                return <FontAwesomeIcon icon={faHospital} className="subnavIcon" />;
            case 3:
                return <FontAwesomeIcon icon={faQuestionCircle} className="subnavIcon" />;
            default:
                return null;
        }
    };

    async handleRadioChange(e) {
        console.log(e.target.value);
        this.setState({ country: e.target.value });

        if (e.target.value === 'GLOBAL') {
            const fetchedGlobalData = await fetchGlobalData();
            this.setState({ data: fetchedGlobalData });
        } else {
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
                data: formattedIndiaData,
                stateWiseData: stateWiseData,
                timeSeriesData: timeSeriesData,
            });
        }
    }
    render() {
        const {
            data,
            dailyTrendData,
            country,
            activeView,
            optionSelected,
            stateWiseData,
            timeSeriesData,
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
                {/* <div className="banner"> Coming Soon: State wise data for India</div> */}
                {/* <div className="contentArea"> */}

                {activeView === 0 ? (
                    <React.Fragment>
                        <div className="countryPickerContainer">
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
                            {country === 'IND' ? (
                                <StatePicker stateWiseData={stateWiseData} />
                            ) : null}
                            {country === 'IND' ? (
                                <StateWiseTable stateWiseData={stateWiseData} />
                            ) : null}
                        </div>
                        <div className="cardContainer">
                            <Cards data={data} />
                        </div>
                        {country === 'IND' ? (
                            <div className="trendChartContainer">
                                <IndiaTrendChart timeSeriesData={timeSeriesData} />
                            </div>
                        ) : null}
                        {country === 'IND' ? (
                            <div className="countryChartContainer">
                                <CountryBarChart countryData={stateWiseData} />
                            </div>
                        ) : null}
                        {country === 'GLOBAL' ? (
                            <div className="globalChartContainer">
                                <GlobalLineChart />
                            </div>
                        ) : null}
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
