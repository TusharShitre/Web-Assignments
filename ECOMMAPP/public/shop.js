function fetchProducts(done) {
  $.get("/api/products", function (data) {
    done(data);
  });
}

function addProduct(name, unit_price, done) {
  $.post(
    "/api/products",
    {
      name: name,
      unit_price: unit_price,
    },
    function (data) {
      done(data);
    }
  );
}

function createProductCard(product) {
  return $(`
    <div class="col-3 mt-4 mr-4 card p-3 bg-dark text-light">
        <h4 class="product-name">${product.name}</h4>
        
        <div class="row">
        
            <div class="col m-3 p-3">
                <b> $.${product.unit_price}</b>
            </div>
            <button class="col btn btn-success m-3">Buy</button> 
        </div>
    </div>`);
    
}
