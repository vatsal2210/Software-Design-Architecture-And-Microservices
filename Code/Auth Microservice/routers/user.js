const express = require("express");
const router = express.Router();
const {
    check
} = require("express-validator/check");

const userController = require("../controller/userController");

router.get('/test', (req, res) => {
    res.send('Gateway working');
});
router.post("/verify",  userController.verify);

router.post(
    "/signup",
    [
        check("firstName")
        .isLength({
            min: 2
        })
        .trim()
        .escape()
        .withMessage("Name Must be at least 2 chars long"),
        check("lastName")
        .isLength({
            min: 2
        })
        .trim()
        .escape()
        .withMessage("Name Must be at least 2 chars long"),
        check("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Enter Valid Email Id"),
        check("password")
        .isLength({
            min: 3
        })
        .withMessage("Password Must be at least 3 chars long")
    ],
    userController.signup
);

router.post(
    "/signin",
    [
        check("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Email is not valid."),
        check("password")
        .isLength({
            min: 3
        })
        .withMessage("Password is not valid.")
    ],
    userController.signin
);

module.exports = router;