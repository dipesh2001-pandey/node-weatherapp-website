const path = require("path");
const express = require("express");
const hbs = require("hbs");
const utils = require("./utils/utils");

const app = express();
const port = process.env.PORT || 3000;
///paths exsist here///
const publicdirPath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");
//setup handle bars and views location
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partials);
//static assets
app.use(express.static(publicdirPath));
app.get("", (req, res) => {
  res.render("index", {
    title: "Haldwani",
    temperature: "30",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Dipesh Kumar Pandey",
  });
});
app.get("/features", (req, res) => {
  res.render("features", {});
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  /*res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
    address: req.query.address,
  });*/
  utils.geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      utils.weatherstat(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastdata,
          location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    errormsg: "Page Not found",
  });
});
app.listen(port, () => {
  console.log(`Server is up onport ${port}`);
});
