const dotenv = require("dotenv");
dotenv.config('../.env');

const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.on("listening", () => {
  console.log("✓", `Listening on Port 5000`);
});
server.listen(5000);
