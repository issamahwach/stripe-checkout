require("dotenv").config();
const Product = require("../models/product");
const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

exports.purchase = async (req, res) => {
  //purchased items list from the front-end
  let items = req.body.items;

  //properly formatted data to be sent to stripe
  let lineItems = [];

  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: process.env.SUCCESS_CHECKOUT_URL,
      cancel_url: process.env.CANCEL_CHECKOUT_URL,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).send("Server Error 500: Error processing your request.");
  }

  /**
   *
   * Extened Features: Get the products from MongoDB, check their availability, reduce the quantity of selected items.
   *
   * **/
};
