//a Separate responsibility  for  Product  HTTP request handling

var Product = require("../dal/productsdal");

exports.getAll = function (req, res) {
  console.log("calling controller function");
  Product.getAllProduct(function (err, product) {
    if (err) res.send(err);
    res.send(product);
  });
};

exports.insert = function (req, res) {
  var product = new Product(req.body);
  console.log(req.body);

  //handles null error
  if (!product.name || !product.unit_price) {
    res.status(400).send({
      error: true,
      message: "Please provide name and price for product",
    });
  } else {
    Product.createProduct(product, function (err, data) {
      if (err) res.send(err);
      res.json(data);
    });
  }
};

exports.getBy = function (req, res) {
  Product.getProductById(req.params.id, function (err, product) {
    if (err) res.send(err);
    res.json(product);
  });
};

exports.update = function (req, res) {
  Product.updateById(
    req.params.id,
    new Product(req.body),
    function (err, product) {
      if (err) res.send(err);
      res.json(product);
    }
  );
};

exports.remove = function (req, res) {
  Product.remove(req.params.id, function (err, product) {
    if (err) res.send(err);
    res.json({ message: "product successfully deleted" });
  });
};
