import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { fetchCountries, fetchStateWiseData } from '../../api/index';
function CountryPicker(props) {
    const [countries, setCountries] = useState({});
    const [states, setStates] = useState({});
    const [selectedCountry, setSelectedCountry] = useState('');
    function handleCountrySelection(selectedOption) {
        setSelectedCountry(selectedOption ? selectedOption.value :  '');
        props.handleCountryChange(selectedOption);
    }
    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedCountries = await fetchCountries();
            setCountries(fetchedCountries);
        };
        fetchAPI();
    }, []);

    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedStateWiseData = await fetchStateWiseData();
            setStates(fetchedStateWiseData);
        };
        fetchAPI();
    }, [selectedCountry]);

    let tempCountries = {};
    if (countries && countries.data && countries.data.countries[0]) {
        tempCountries = countries.data.countries.map((p) => ({
            value: p.iso3,
            label: p.name,
        }));
    }
    if (tempCountries.length > 0) {
        return (
            <React.Fragment>
                <Select
                    //defaultValue={{ label: 'India', value: 'IND' }}
                    options={tempCountries}
                    onChange={handleCountrySelection}
                    isClearable
                    placeholder="Select Country"
                />
                <p style={{ fontStyle: 'italic', fontSize: '12px' }}>
                    * daily trend chart is available only for INDIA
                </p>
                 {selectedCountry === 'IND' ?  <Select
                    //defaultValue={{ label: 'India', value: 'IND' }}
                    options={tempCountries}
                    onChange={handleCountrySelection}
                    isClearable
                    placeholder="Select State"
                /> : null}
            </React.Fragment>
        );
    }
    return null;
}

export default CountryPicker;
