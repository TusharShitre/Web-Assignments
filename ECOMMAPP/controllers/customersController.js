//a Separate responsibility  for  Flowers  HTTP request handling

var Customer = require("../dal/customersdal");

exports.getAll = function (req, res) {
  console.log("calling controller function");
  Customer.getAllCustomer(function (err, cust) {
    if (err) res.send(err);
    res.send(cust);
  });
};

exports.insert = function (req, res) {
  var new_cust = new Customer(req.body);
  console.log(new_cust);

  //handles null error
  if (!new_cust.first_name || !new_cust.last_name) {
    res.status(400).send({ error: true, message: "Please provide name" });
  } else {
    Customer.createCustomer(new_cust, function (err, cust) {
      if (err) res.send(err);
      res.json(cust);
    });
  }
};

exports.getBy = function (req, res) {
  Customer.getCustomerById(req.params.id, function (err, cust) {
    if (err) res.send(err);
    res.json(cust);
  });
};

exports.update = function (req, res) {
  Flower.updateById(
    req.params.id,
    new Customer(req.body),
    function (err, cust) {
      if (err) res.send(err);
      res.json(cust);
    }
  );
};

exports.remove = function (req, res) {
  Customer.remove(req.params.id, function (err, cust) {
    if (err) res.send(err);
    res.json({ message: "Flower successfully deleted" });
  });
};
