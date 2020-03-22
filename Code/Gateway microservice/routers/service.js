const express = require("express");
const router = express.Router();
const {
    check
} = require("express-validator/check");


const serviceController = require("../controller/serviceController");
const searchController = require("../controller/searchController");
const isAuth = require("../middleware/is-auth");

router.get('/testing', (req, res) => {
    res.send('Gateway working');
});

router.get("/list",  serviceController.list);
router.post("/search", searchController.search);
router.post("/search1", isAuth, searchController.search);

module.exports = router;