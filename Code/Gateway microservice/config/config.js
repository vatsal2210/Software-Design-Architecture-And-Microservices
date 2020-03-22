module.exports = {
    server: {
        port: 8080
    },

    email: {
        action: false,
        id: '',
        password: ''
    },

    JWT: {
        JWT_ENCRYPTION: "gatewayJWTToken",
        JWT_EXPIRATION: "7d"
    }

};