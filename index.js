#!/usr/bin/env node

const axios = require('axios');
const countryList = require('country-list');
const chalk = require('chalk');
const log = console.log;

function holidates() {
    let year = new Date().getFullYear();
    let country = process.argv.slice(2)
    if (country != "") {
        let code = countryList.getCode(country[0]);
        axios.get(`https://date.nager.at/api/v2/publicholidays/${year}/${code}`)
            .then(function (response) {
                log(chalk.bgWhite(chalk.cyan('List of holidays for ') + chalk.bold.magenta(country[0] + ':')));
                let holidays = response.data;
                holidays.forEach(element => {
                    let name = element.name;
                    let date = element.date;
                    log(chalk.green.bold.italic(name + ': ') + chalk.yellow(date));
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