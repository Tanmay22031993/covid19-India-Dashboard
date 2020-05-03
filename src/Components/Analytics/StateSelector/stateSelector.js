import React, { useState, useEffect } from 'react';
import Select from 'react-select';
function StatePicker(props) {
    console.log(props);
    let tempStates = [];
    if (props.stateWiseData) {
        tempStates = props.stateWiseData
            .filter((p) => p.state !== 'Total')
            .map((p) => ({
                value: p.state,
                label: p.state,
            }));
    }

    console.log(tempStates);
    if (tempStates.length < 1) {
        return <h2>Loading States...</h2>;
    }
    return (
        <React.Fragment>
            <Select
                //defaultValue={{ label: 'India', value: 'IND' }}
                options={tempStates}
                //onChange={handleCountrySelection}
                isClearable
                placeholder="Select State"
            />
            {/* {selectedCountry === 'IND' ? (
                <Select
                    //defaultValue={{ label: 'India', value: 'IND' }}
                    options={tempCountries}
                    onChange={handleCountrySelection}
                    isClearable
                    placeholder="Select State"
                />
            ) : null} */}
        </React.Fragment>
    );
    // return <h2>Loading States...</h2>;
}

export default StatePicker;
