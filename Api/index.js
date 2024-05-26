const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const Stripe = require('stripe');

const stripe = new Stripe('sk_test_51PKnNJIDObO0roetYtw0le7i7BXIaAgXRo7Ym79WgUNorek4sdapc89WkE6KEko7qvi9PAJAdn1jPmzxDoHGPEoJ0097q55YRe');

conn.sync({ force: false }).then(() => {
  console.log("Conexion con base de datos con exito");
  server.listen(3001, () => {
    console.log("Servidor levantado con exito");
  });
});
