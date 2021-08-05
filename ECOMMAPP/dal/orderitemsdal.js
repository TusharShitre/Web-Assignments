var sql = require("./mysqlconnect");

var OrderItem = function (OrderItem) {
  this.order_id = OrderItem.product_id;
  this.product_id = OrderItem.product_id;
  this.quantity = OrderItem.quantity;
  this.unit_price = OrderItem.unit_price;
};
OrderItem.createOrderItem = function (newOrderItem, result) {
  console.log("New OrderItem to be added ");
  console.log(newOrderItem);
  sql.query("INSERT INTO order_items SET ?", newOrderItem, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

OrderItem.getOrderItemById = function (OrderItemId, result) {
  sql.query(
    "SELECT * FROM order_items WHERE order_id = ? ",
    OrderItemId,
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

OrderItem.getAllOrderItem = function (result) {
  console.log("Invoking dal getall OrderItems");

  sql.query("SELECT * FROM order_items", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("OrderItems : ", res);
      result(null, res);
    }
  });
};

OrderItem.updateById = function (id, pid, OrderItem, result) {
  sql.query(
    "UPDATE order_items SET quantity = ?,unit_price = ?  WHERE order_id = ? AND product_id = ?",
    [
      OrderItem.first_name,
      OrderItem.last_name,
      OrderItem.birth_date,
      OrderItem.address,
      OrderItem.city,
      OrderItem.state,
      OrderItem.points,
      id,
      pid,
    ],
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

OrderItem.remove = function (id, pid, result) {
  sql.query(
    "DELETE FROM OrderItems WHERE order_id = ? AND product_id = ?",
    [id, pid],
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

module.exports = OrderItem;
