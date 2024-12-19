const http = require("http");
const app = require("./app");
const connectToDb = require("./db/db");
const { IinitializeSocketIo } = require("./socket");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

IinitializeSocketIo(server);

connectToDb()
  .then(() => {
    server.listen(port, () => {
      console.log("server is listning on port :", port);
    });
  })
  .catch((err) => {
    console.error(err);
  });
