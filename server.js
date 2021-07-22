const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const PORT = 4000;
const app = express();
const appStatus = true;

pp.listen(process.env.PORT || 4000, function () {
  console.log("Node app is working!");
});

var whitelist = ["http://localhost:3000"];

app.use(cors());
app.use(
  cors({
    origin: function (origin, callback) {
      console.log(origin);
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));

var Routes = require("./api/routes/controlRoutes");
Routes(app);
