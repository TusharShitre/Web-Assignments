//a Separate responsibility  for  Flowers  HTTP request handling

var Order = require("../dal/ordersdal");

exports.getAll = function (req, res) {
  console.log("calling controller function");
  Order.getAllOrder(function (err, order) {
    if (err) res.send(err);
    res.send(order);
  });
};

exports.insert = function (req, res) {
  var new_order = new Order(req.body);
  console.log(new_order);

  //handles null error
  if (!new_order.customer_id) {
    res
      .status(400)
      .send({ error: true, message: "Please provide customer id" });
  } else {
    Order.createOrder(new_order, function (err, order) {
      if (err) res.send(err);
      res.json(order);
    });
  }
};

exports.getBy = function (req, res) {
  Order.getOrderById(req.params.id, function (err, order) {
    if (err) res.send(err);
    res.json(order);
  });
};

exports.update = function (req, res) {
  Order.updateById(req.params.id, new Order(req.body), function (err, order) {
    if (err) res.send(err);
    res.json(order);
  });
};

exports.remove = function (req, res) {
  Order.remove(req.params.id, function (err, order) {
    if (err) res.send(err);
    res.json({ message: "Flower successfully deleted" });
  });
};
