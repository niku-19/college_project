const Router = require("express").Router();
const Controller = require("../controllers/order");
Router.post("/order", Controller.placeOrder);
Router.get("/items", Controller.items);
module.exports = Router;
