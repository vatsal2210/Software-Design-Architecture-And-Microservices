const axios = require('axios');

const registryURL = "https://ypgateway.mybluemix.net/getMicroServicesList";

exports.list = (req, res, next) => {
    try {
        console.log('Get list of APIs for a dropdown');
        axios.get(registryURL)
            .then(function (response) {
                // handle success
                console.log('checkServicesStatus res', response.data);
                res.send(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log('checkServicesStatus error', error);
                res.send({
                    code: 500,
                    message: 'Something went wrong. Try again!'
                });
            })
    } catch (error) {
        logger.error("User login error ", error);
        next(error);
    }
};