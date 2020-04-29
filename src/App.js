import React from 'react';
import './App.css';
import Cards from './Components/Cards/cards';
import GlobalLineChart from './Components/Chart/LineChart';
import CountryBarChart from './Components/Chart/BarChart';
import DailyTrendChart from './Components/Chart/DailyTrendChart';
import CountryPicker from './Components/CountrySelector/countrySelector';
import { fetchData, fetchCountryData, fetchDailyTrends, fetchStateWiseData } from './api';
import facebookIcon from './Images/facebookIcon.png';
import linkedInIcon from './Images/linkedInIcon.webp';
import loveIcon from './Images/love.png';
import { Divider, Typography } from '@material-ui/core';
class App extends React.Component {
    state = {
        data: {},
        countryData: '',
        //country: { label: 'India', value: 'IND' },
        country: '',
        dailyTrendData: '',
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
                let formattedDailyTrends =  fetchedDailyTrends.data.cases_time_series.slice(-7).map(obj => {
                    obj['dailyconfirmed'] = parseInt(obj['dailyconfirmed'])
                    obj['dailydeceased'] = parseInt(obj['dailyconfirmed'])
                    obj['dailyrecovered'] = parseInt(obj['dailyrecovered'])
                    return obj
                 })
                 console.log(formattedDailyTrends)
                this.setState({
                    country: country.value,
                    dailyTrendData: formattedDailyTrends
               });
            }
        }
        if (country) {
            this.setState({ country: country, data: fetchedData.data });
        } else {
            this.setState({ country: '', data: fetchedData.data });
        }
    }
    render() {
        const { data, dailyTrendData, country } = this.state;
        return (
            <div className="parentContainer">
                <div className="banner"> Coming Soon: State wise data for India</div>
                <div className="header"></div>
                <div className="countryPickerContainer">
                    <CountryPicker handleCountryChange={this.handleCountryChange.bind(this)} />
                </div>
                <div className="cardContainer">
                    <Cards data={data} />
                </div>
                {country.value === 'IND' ? (
                    <div className="trendChartContainer">
                        <DailyTrendChart dailyTrendData={dailyTrendData} country={country} />{' '}
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
                <Divider />
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
