import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchGlobalData = async () => {
    try {
        const fetchedData = await axios.get(url);
        const modifiedData = {
            confirmed: fetchedData.data.confirmed.value,
            recovered: fetchedData.data.recovered.value,
            deaths: fetchedData.data.deaths.value,
            lastUpdate: fetchedData.data.lastUpdate,
        };
        return modifiedData;
    } catch (error) {}
};

export const fetchGlobalDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        return { data };
    } catch (error) {}
};

// export const fetchStates = async () => {
//     try {
//         const { data } = await axios.get(`${url}/countries`);

//         return { data };
//     } catch (error) {}
// };

// export const fetchCountryData = async (country) => {
//     try {
//         let url2;
//         if (country === 'IND') {
//             url2 = `${url}/countries/${country}`;
//         } else {
//             url2 = 'https://covid19.mathdro.id/api';
//         }
//         const { data } = await axios.get(url2);

//         return { data };
//     } catch (error) {}
// };

export const fetchDailyTrends = async (country) => {
    try {
        const url = 'https://api.covid19india.org/data.json';
        const { data } = await axios.get(url);

        return { data };
    } catch (error) {}
};

// export const fetchIndiaData = async (country) => {
//     try {
//         const url = 'https://www.mohfw.gov.in/data/datanew.json';
//         const { data } = await axios.get(url);

//         return { data };
//     } catch (error) {}
// };
