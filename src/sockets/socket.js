const { io } = require("../../app");
const authenticateSocket = require('../middlewares/validate-socket');
const controller = require('../controllers/socketController');
const logger = require("../helpers/logger");

  io.on("connection", async (client) => {

    client.handshake.headers['Authorization'];
    
    try {
      await authenticateSocket(client);

    const user = client.request.user;

    controller.onlineUser(user._id);
    
    client.on('disconnect', () => {
    
      logger.info(`Disconnected client: ${user._id}`);
  
      controller.offlineUser(user._id);
  
    });

    } catch (error) {
      console.log(error);
    }
    
  });

