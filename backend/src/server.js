const http = require("http");
const app = require("./app");
const connectToDb = require("./db/db");
const { IinitializeSocketIo } = require("./socket");
const { logger } = require("./utils/logger");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

IinitializeSocketIo(server);

connectToDb()
  .then(() => {
    server.listen(port, () => {
      logger.info("server is listning on port :" + port);
    });
  })
  .catch((err) => {
    logger.info(err.message);
    console.error(err);
  });
