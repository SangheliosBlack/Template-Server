const passport = require('passport');
const logger = require("../helpers/logger");

const authenticateSocket = async (socket, next) => {
  try {
    const user = await new Promise((resolve, reject) => {
      passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err || !user) {
          logger.error("Error de autenticación socket disconnect")
          socket.emit("authentication_failed", { message: "No autorizado" });
          socket.disconnect(true);
         
        } else {
          socket.request.user = user;
          logger.info(`Cliente conectado: ${user._id}`);
          resolve(user);
        }
      })(socket.request, {}, next);
    });

    // Resto de la lógica para manejar la conexión del usuario autenticado...
  } catch (error) {
    console.error("Error durante la autenticación:", error.message);
  }
};

module.exports = authenticateSocket;