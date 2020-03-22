const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const moment = require("moment");
const helmet = require("helmet");
global.__basedir = __dirname;

const config = require("./config/config");

/* Logger start */
const path = require("path");
const morgan = require("morgan");
var rfs = require("rotating-file-stream");

// log only 4xx and 5xx responses to console
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    }
  })
);

var accessLogStream = rfs("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "./log")
});

// setup the logger
app.use(
  morgan("combined", {
    stream: accessLogStream
  })
);

const serviceRoute = require("./routers/service");

app.use(
  bodyParser.json({
    limit: 5242880
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(helmet());

app.use("/service", serviceRoute);

app.use((error, req, res, next) => {
  delete error.stack;
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    code: statusCode,
    message: error.message
  });
});

/* Find Exception and send email to admin */
process.on("uncaughtException", function (error) {
  console.log("error uncaughtException");
  var exception_msg = error.message,
    exception_stack = error.stack;

  console.log("App Crashed! ", exception_msg);
  console.log("stack ", exception_stack);

  var data = {
    err_msg: exception_msg,
    err_stack: exception_stack,
    isAdmin: 1
  };
  // mailer.sendEmail(data);
});

app.listen(config.server.port, (err, res) => {
  if (err) {
    throw error;
  }
  console.log(
    "-------- Starting Application --------  ",
    config.server.port,
    moment().format("DD-MM-YYYY hh:mm:ss:SSS A")
  );
});