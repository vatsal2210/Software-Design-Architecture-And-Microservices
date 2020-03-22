const axios = require('axios');
const authURL = "/user/verify";

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not authenticated.");
        error.status = 401;
        throw error;
    }
    const token = authHeader.split(" ")[1];

    axios.post(authURL, {
            token: token
        })
        .then(function (data) {
            // handle success
            console.log('authenticated req', data);
            next();
        })
        .catch(function (error) {
            // handle error
            console.log('error', error);
            return res.send({
                code: 401,
                message: "Not authenticated."
            });
        })
};