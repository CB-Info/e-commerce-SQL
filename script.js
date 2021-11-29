const mysql = require('mysql');
let faker = require('faker/locale/fr');
const { countBy } = require('underscore');
const db = mysql.createConnection({
    multipleStatements: true,

    host: "127.0.0.1",
 
    user: "root",
    database: "data_base"
  });

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");       
});

for (id=1; id <=10; id++){
  //user
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let email = faker.internet.email();
  let password = faker.internet.password();

  //address
  let address = faker.address.streetAddress();
  let postal_code= faker.address.zipCodeByState();
  let city = faker.address.cityName();

  //product
  let productName = faker.commerce.product();
  let priceProduct = faker.commerce.price();

  var sql = `INSERT INTO user (nom, prenom, email, password, address_id, cart_id) 
  VALUES ('${lastName}', '${firstName}', '${email}', '${password}', '${id}', '${id}'); 
  INSERT INTO address (address, postal_code, city, country, user_id) 
  VALUES ('${address}', '${postal_code}', '${city}', 'France', '${id}');
  INSERT INTO product (name, price)
  VALUES ('${productName}', '${priceProduct}')
  `;

  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

db.end();
