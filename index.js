const http = require("http");

const app = require("./routes/index");

let server = http.createServer(app);
server.listen(process.env.PORT || 3000);

server.on("listening", () => {
  const addr = server.address();
  let bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

  console.log(`Listening on ${bind}`);
});
  