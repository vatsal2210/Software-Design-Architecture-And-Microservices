const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not authenticated.");
        error.status = 401;
        throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.JWT.JWT_ENCRYPTION);
    } catch (error) {
        error.status = 500;
        throw error;
    }
    if (!decodedToken) {
        const error = new Error("Not authenticated.");
        error.status = 401;
        throw error;
    }
    //console.log("decodedToken ", decodedToken);
    req.userId = decodedToken.userId;
    next();
};