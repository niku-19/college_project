const order = require("../database/model/order");
const crypto = require("crypto")
const sendMail = require("../utils/mail");
class Order {
  async placeOrder(req, res) {
    const orderIds = crypto.randomInt(0, 1000000)
    const newOrder = new order({
      orderId: orderIds,
      firstName: req.body.firstName,
      lastName: req.body.secondName,
      email: req.body.email,
      phoneNumber: Number(req.body.phoneNumber),
      address: req.body.address,
      landMark: req.body.landmark,
      orderItems: req.body.orderItems,
      paymentMode: "cash",
    });
    newOrder
      .save()
      .then(
        (response) =>
          console.log("Placed successfully"),
          sendMail(req.body.email, orderIds),
          res.json({
            message: "Sucessfully Placed",
            status: 200,
          })
      )
      .catch(
        (err) =>
          console.log("Error while placing order") &&
          res.json({
            message: "error while creating order",
            status: 401,
            err: err.message,
          })
      );
  }
  async checking(req, res) {
    res.json({
      message: "Neha",
    });
  }
  async items(req, res) {
    const foodItems = [
      {
        id: "01",
        itemName: "Veg Biriyani",
        rate: "200",
        thumbnail: "product-1.jpg",
        rating: "4.5",
        position: "fade-right",
      },
      {
        id: "02",
        itemName: "vegetable-wine",
        rate: "400",
        thumbnail: "product-2.jpg",
        rating: "3.5",
        position: "fade-left",
      },
      {
        id: "03",
        itemName: "Veg Roll",
        rate: "80",
        thumbnail: "product-3.jpg",
        rating: "5",
        position: "fade-right",
      },
      {
        id: "04",
        itemName: "Veg Noodles",
        rate: "60",
        thumbnail: "product-4.jpg",
        rating: "4.4",
        position: "fade-left",
      },
    ];
    res.json(foodItems);
  }
}

module.exports = new Order();
