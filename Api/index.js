const server = require('./src/server.js');
const { conn } = require('./src/db.js');


conn.sync({ force: true }).then(() => {
  console.log('Conexion con base de datos con exito');
  server.listen(3001, () => {
    console.log('Servidor levantado con exito'); 
  });
});