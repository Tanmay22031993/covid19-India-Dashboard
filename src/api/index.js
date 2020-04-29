import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
    try {
        const {
            data: { confirmed, recovered, deaths, lastUpdate },
        } = await axios.get(url);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {}
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        return { data };
    } catch (error) {}
};

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get(`${url}/countries`);

        return { data };
    } catch (error) {}
};

export const fetchCountryData = async (country) => {
    try {
        let url2 = `${url}/countries`;
        if (country) {
            url2 = `${url}/countries/${country.value}`;
        } else {
            url2 = url;
        }
        const { data } = await axios.get(url2);

        return { data };
    } catch (error) {}
};

export const fetchDailyTrends = async (country) => {
    
    try {
        const url = 'https://api.covid19india.org/data.json';
        const { data } = await axios.get(url);

        return { data };
    } catch (error) {}
};

export const fetchStateWiseData = async (country) => {
    
    try {
        const url = 'https://www.mohfw.gov.in/data/datanew.json';
        const { data } = await axios.get(url);

        return { data };
    } catch (error) {}
};