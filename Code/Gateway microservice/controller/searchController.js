const axios = require('axios');
const services = ["skiResort", "restaurants", "museums", "companies"];

const skiResortServiceURL = 'https://ypgateway.mybluemix.net:443/ski/resort/search';
const restaurantsServiceURL = 'https://ypgateway.mybluemix.net:443/rest/restaurant/search';
const museumsServiceURL = 'https://ypgateway.mybluemix.net:443/museum/museum/search';
const company = 'https://ypgateway.mybluemix.net:443/company/company/search';

exports.search = (req, res, next) => {
    console.log('search ', req.body);
    try {
        const serviceName = req.body.serviceName;
        const query = req.body.searchParam;
        var searchData = '';

        if (serviceName == '' || serviceName == undefined) {
            console.log('Service Name is invalid');
            res.send({
                code: 200,
                message: 'Please select service Name'
            });
        } else if (query == "" || query == undefined) {
            console.log('Search Params are invalid');
            res.send({
                code: 200,
                message: 'Enter valid search params'
            });
        } else {
            // Found service name
            var url;
            if (serviceName.includes("skiResort")) {
                console.log('In skiResort');
                url = skiResortServiceURL;
            }

            if (serviceName.includes("restaurants")) {
                console.log('In restaurants');
                url = restaurantsServiceURL;
            }

            if (serviceName.includes("museums")) {
                console.log('In museums');
                url = museumsServiceURL;
            }

            if (serviceName.includes("company")) {
                console.log('In company');
                url = company;
            }

            console.log('url ', url);
            console.log('searchData ', searchData);
            axios.post(url, {
                    query: query
                })
                .then(function (response) {
                    res.send(response.data);
                })
                .catch(function (error) {
                    console.log('/search error', error);
                    res.send(error);
                });
        }
    } catch (error) {
        console.log("User login error ", error);
        next(error);
    }
};