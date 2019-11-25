#!/usr/bin/env node

const axios = require('axios');
const countryList = require('country-list');

function holidates() {
    let year = new Date().getFullYear();
    let country = process.argv.slice(2)
    if (country != "") {
        let code = countryList.getCode(country[0]);
        axios.get(`https://date.nager.at/api/v2/publicholidays/${year}/${code}`)
            .then(function (response) {
                console.log(`List of holidays for ${country[0]}:`);
                let holidays = response.data;
                holidays.forEach(element => {
                    let name = element.name;
                    let date = element.date;
                    console.log(`${name}: ${date}`);
                });
            })
            .catch(function (error) {
                console.log("This is not a valid country");
            })
    } else {
        console.log('Please enter a country as parameter. Ex: "holidates Norway"')
    }
}

holidates();