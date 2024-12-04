const http = require("http");
const app = require("./app");
const connectToDb = require("./db/db");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

connectToDb()
  .then(() => {
    server.listen(port, () => {
      console.log("server is listning on port :", port);
    });
  })
  .catch((err) => {
    console.error(err);
  });
