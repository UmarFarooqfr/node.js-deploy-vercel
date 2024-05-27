import express from "express";
import mongoose from "mongoose";
import http from "http";
import { routes } from "./src/route";

const bodyParser = require("body-parser");
const cors = require("cors");

export const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors({ origin: "*"}));

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
const port = 3000;
export const TOKEN_KEY = "11223344";
routes(app);
const url = `mongodb+srv://wwwburjsoft:gBLTbWrZsDYS9kR5@cluster0.k2bwmju.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database!", url);
  })
  .catch((error) => {
    console.log("Connection failed!:", error);
  });
server.listen(port, () => {
  console.log(`Express server listening ${port}: Running!`);
});

app.get('/', function (req, res) {
  res.send('***** API is Running! *****');
});
