
app.constant('applicationConfig', {relativeCurrencies: ['AUD', 'USD', 'NOK', 'CAD', 'THB'], currencyToRate: "EUR"});
// to add new relative currency push it relativeCurrencies array

app.factory('ratesFactory', function (openExchangeRates, currencyApi, ecbInt)
{
    var result = {};
    for (var i = 0; i < arguments.length; ++i) {
        result[arguments[i].getName()] = (arguments[i]);
    }
    return result;
});


app.controller('currencyController', function ($scope,currencyData, ratesFactory, applicationConfig) {

    $scope.ratesSources = [];
    $scope.receivedData = {};
    
    
    for (var i = 0; i < applicationConfig.relativeCurrencies.length; i++) {
        $scope.receivedData[applicationConfig.relativeCurrencies[i]] = [];
    }

    for (var resource in ratesFactory) {
        $scope.ratesSources.push(ratesFactory[resource].getName()); //get resource name, it will displayed in table heading

        !function processRequestsResults(i) {
            ratesFactory[i].getRates().success(function (response) {
                var ratesObject = ratesFactory[i].processRates(response);
                for (var property in ratesObject) {
                //    $scope.receivedData[property].push(ratesObject[property]);
                    $scope.receivedData[property] [$scope.ratesSources.indexOf(ratesFactory[i].getName())]=ratesObject[property];
                }

            });
        }(resource)
    }

});


function RatesResource()
{
    this.getName=function(){return this.name};
}

function OpenExchangeRates($http, applicationConfig)
{
    RatesResource.call(this);
    this.name='openexchangerates.org';
    this.url="https://openexchangerates.org/api/latest.json?app_id=77538703bbf442e79c1632838b6a3aa9";

    this.getRates = function () {
        return $http.get(this.url);
    };
    this.processRates = function (data) { //handles received data and returns object {AUD:1.2..} with relative currencies name and values
        var result = {};
        var currencyToRate = data.rates[applicationConfig.currencyToRate];

        for (var i = 0; i < applicationConfig.relativeCurrencies.length; ++i) {

            var rate = (data.rates[applicationConfig.relativeCurrencies[i]] / currencyToRate);
            result[applicationConfig.relativeCurrencies[i]] = rate;
        }
        return result;
    }
};


function CurrencyApi($http, $q, applicationConfig) {
    RatesResource.call(this);
    this.name='appspot.com';
    this.getRates = function () {  //makes one $http.jsonp request for each relative currency
        var requestArray = [];
        for (var i = 0; i < applicationConfig.relativeCurrencies.length; i++) {
            requestArray.push($http.jsonp("http://currency-api.appspot.com/api/" + applicationConfig.currencyToRate + "/"
                + applicationConfig.relativeCurrencies[i] + ".jsonp?callback=JSON_CALLBACK&temp=" + (new Date().getTime())));
        }
        var promise = $q.all(requestArray);
        promise.success = function (fn) { //adding success funtion to promise object
            promise.then(function (response) {
                fn(response);
            });
            return promise;
        };
        return promise;
    };
    this.processRates = function (data) {
        var result = {};
        for (var i = 0; i < data.length; i++) {

            result[data[i].data.target] = data[i].data.rate;
        }
        return result;
    }

}

function EcbInt ($http, applicationConfig) {
    RatesResource.call(this);
    this.name="ecb.int";
    this.url="http://nazarmsx-001-site1.hostbuddy.com/index.php";   //proxy script

    this.getRates = function () {
        return $http.get(this.url);
    };
    this.processRates = function (data) {
        var result = {};
        for (var i = 0; i < applicationConfig.relativeCurrencies.length; ++i) {

            result[applicationConfig.relativeCurrencies[i]] = data[applicationConfig.relativeCurrencies[i]];
        }
        return result;
    }
}

//registering of services
app.service('openExchangeRates', OpenExchangeRates);
app.service('currencyApi', CurrencyApi);
app.service('ecbInt',EcbInt);

app.service('currencyData',function($http)
{
        this.url="http://www.localeplanet.com/api/auto/currencymap.json?name=Y";   //proxy script
        this.getCurrencyAttributes = function () {
        return $http.get(this.url);};
        this.processRates = function (data) {
        return data;
        };
    
});