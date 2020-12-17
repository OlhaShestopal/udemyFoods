const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 8080;
const HOST = '127.0.0.1'

function handleSubmit(req, res, reqUrl) {
  req.setEncoding('UTF-8');
  res.setHeader("Content-Type", "applcation/json");

  req.on("data", (chunk) => {
    fs.appendFileSync("response.txt", chunk)
    res.writeHead(200);
    res.end();
  })
}

const server = http.createServer((req, res) => {
  const router = {
    "POST/send-form": handleSubmit,
  };

  let reqUrl = new URL(req.url, `http://${HOST}/`);
  let redirectedFunc = router[req.method + reqUrl.pathname] || router.default;
  redirectedFunc(req, res, reqUrl);
});

server.listen(PORT, HOST, () => console.log(`Server is running at http://${HOST}:${PORT}`));