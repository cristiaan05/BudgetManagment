import { config as configureEnvVars } from "dotenv";
import axios from 'axios';

// const axios = require('axios');
// Replace with your access key
const rates = [
    //USD
    { USD: 1, EUR: 0.943042 },
    { USD: 1, MXN: 18.363905 },
    { USD: 1, JPY: 134.865498 },
    { USD: 1, GTQ: 7.815839 },
    //MXN
    { MXN: 1, GTQ: 0.425563 },
    { MXN: 1, USD: 0.054456 },
    { MXN: 1, JPY: 7.344122 },
    { MXN: 1, EUR: 0.051344 },
    //EUR
    { EUR: 1, MXN: 19.473843 },
    { EUR: 1, USD: 1.060459 },
    { EUR: 1, JPY: 143.016116 },
    { EUR: 1, GTQ: 8.288375 },
    //GTQ
    { GTQ: 1, EUR: 0.120639 },
    { GTQ: 1, USD: 0.127945 },
    { GTQ: 1, JPY: 17.255217 },
    { GTQ: 1, MXN: 2.349828 },
    //JPY
    { JPY: 1, MXN: 0.136181 },
    { JPY: 1, USD: 0.007415 },
    { JPY: 1, GTQ: 0.057953 },
    { JPY: 1, EUR: 0.006992 }
]

export async function getExchangeRates(request, response) {
    configureEnvVars();

    try {
        const { baseCurrency, currencyToChange,baseValue } = request.body;
        if (!baseCurrency || !currencyToChange) {
            return response
                .status(404)
                .send({ successfull: false, message: "transaction data missing" });
        }

        const matchingRates = rates.filter(rate => rate[baseCurrency] && rate[currencyToChange]);

        // const filteredRates = rates.filter(obj => Object.entries(obj)[0][0] === baseCurrency);

        // console.log(filteredRates);
        const filteredRates = rates.filter(rate => {
            return rate[baseCurrency] !== undefined && rate[currencyToChange] !== undefined;
          });
          
          const rate = filteredRates.find(rate => rate[baseCurrency] === 1 && rate[currencyToChange]);
          let rateBaseToExchange=rate[`${currencyToChange}`]/rate[`${baseCurrency}`]
          console.log(rate);
          let exchangeValue=(baseValue*rateBaseToExchange).toFixed(2);
          console.log(baseValue*rateBaseToExchange)
        let first = matchingRates.length > 0 ? matchingRates[0] : null
        return response.status(200).send({
            base: rate[`${baseCurrency}`],
            change: rate[`${currencyToChange}`],
            rateBaseToExchange: rateBaseToExchange,
            value: exchangeValue
        }
        )

        // try {
        //     const apiKey = '1MB9r0ArNLN9R5pNBKklGH3gvJye1wxL';
        //     const url = 'https://api.apilayer.com/fixer/latest?base=JPY&symbols=JPY,EUR';

        //     const data = axios.get(url, {
        //         headers: {
        //             'apikey': apiKey
        //         }
        //     }).then(result => {
        //         console.log(result.data.rates);
        //         return result.data.rates
        //         // return response.status(200).send({
        //         //     result
        //         // })
        //     }).catch(error => {
        //         console.log(error);
        //     });

        return response.status(200).send({
            data
        })
    } catch (error) {
        console.error(error);
        return response.status(500).send({
            successfull:false,
            message: "Error creating the exchange"
        });
    }
}

//getExchangeRates('USD');
