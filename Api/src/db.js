require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_URL } = process.env;

const sequelize = new Sequelize(DB_URL, {
  logging: false,
  native: false,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Solo necesitas esto si tienes problemas con el certificado
    },
  },
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js",
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, ShoppingCart, Article, Category, Review, Cart_Articule } = sequelize.models;

User.hasOne(Review);
Review.belongsTo(User);

User.hasMany(ShoppingCart);
ShoppingCart.belongsTo(User);

Article.belongsToMany(ShoppingCart, { through: Cart_Articule });
ShoppingCart.belongsToMany(Article, { through: Cart_Articule });

Article.belongsToMany(Category, { through: "ArticleCategory" });
Category.belongsToMany(Article, { through: "ArticleCategory" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
