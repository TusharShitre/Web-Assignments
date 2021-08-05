var sql = require("./mysqlconnect");

var Product = function (Product) {
  this.name = Product.name;
  this.quantity_in_stock = Product.quantity_in_stock;
  this.unit_price = Product.unit_price;
};
Product.createProduct = function (newProduct, result) {
  console.log("New Product to be added ");
  console.log(newProduct);
  sql.query("INSERT INTO products SET ?", newProduct, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Product.getProductById = function (ProductId, result) {
  sql.query(
    "Select * from products where Id = ? ",
    ProductId,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Product.getAllProduct = function (result) {
  console.log("Invoking dal getall Products");

  sql.query("Select * from products", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Products : ", res);
      result(null, res);
    }
  });
};

Product.updateById = function (id, Product, result) {
  sql.query(
    "UPDATE products SET name = ?,quantity_in_stock = ?, unit_price = ? WHERE product_id = ?",
    [Product.name, Product.quantity_in_stock, Product.unit_price, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Product.remove = function (id, result) {
  sql.query(
    "DELETE FROM products WHERE product_id = ?",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Product;
