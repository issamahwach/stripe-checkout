require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = require("express")();
const http = require("http").createServer(app);
const mongoConnection = require("./config/db");

mongoConnection.connect();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const checkoutRoutes = require("./routes/checkout.routes");
app.use("/api/checkout", checkoutRoutes);

http.listen(process.env.PORT, () => {
  console.log(`Server Started on port: ${process.env.PORT}`);
});
