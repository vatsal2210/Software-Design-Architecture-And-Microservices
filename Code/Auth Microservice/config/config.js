module.exports = {
    server: {
        port: 8080
    },

    email: {
        action: false,
        id: '',
        password: ''
    },

    mongoDB: {
        url: "mongodb://vatsal:western2210@ds017195.mlab.com:17195/western-software-architecture"
    },

    JWT: {
        JWT_ENCRYPTION: "authServiceJWT",
        JWT_EXPIRATION: "7d"
    }

};