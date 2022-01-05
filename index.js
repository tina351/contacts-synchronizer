const http = require("http");

const app = require("./routes/index");
const logger = require("./logger").getLogger();

let server = http.createServer(app);
server.listen(process.env.PORT || 3000);

server.on("listening", () => {
  const addr = server.address();
  let bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

  logger.info(`Listening on ${bind}`);
});
  