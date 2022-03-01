import endpoints from './endpoints';

/**
 * ApiConnection
 * @description Main class to make Request to the server
 */
class ApiConnection {
    constructor() {
        this.api = endpoints;
        this.dollarRate = 0;
        this.rates = {};
    }

    getDollarRate(rates = {}){
        const rate = Object.entries(rates).find((rate) => rate[0] === "USD" || 0);
        return rate ? rate.pop() : 0;
    }

    getCurrencies() {
        return fetch(this.api.getCurrencies)
            .then((response) => response.json())
            .then(({rates}) => {
                this.rates = rates;
                this.dollarRate = this.getDollarRate(rates);
                return rates;
            });
    }

    getDollarCurrency(){
        return this.dollarRate;
    }

    getRates(){
        return this.rates;
    }
}

export default ApiConnection;
