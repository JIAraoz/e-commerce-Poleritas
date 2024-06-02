require("dotenv").config();
const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const Stripe = require('stripe');
const {STRIPE_URL}=process.env
const stripe = new Stripe(STRIPE_URL);

conn.sync({ force: true }).then(() => {
  console.log("Conexion con base de datos con exito");
  server.listen(3001, () => {
    console.log("Servidor levantado con exito");
  });
});
