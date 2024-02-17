const fs = require("fs");
const http = require("http");
const url = require("url");

// console.log('http :>> ', http);

// http.createServer((req,res) => {
//     res.end('hello this is the your end')
// })

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const server = http.createServer((req, res) => {
  const pathName = req?.url;
  if (pathName == "/" || pathName == "/product_data") {
    res.writeHead(200, "Success", {
      "my-own-header": "jini-success",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "my-own-header": "Hello-jinii",
    });
    res.end("Page not found");
  }
});

server.listen(8000, "192.168.29.26", () => {
  console.log("Start your server port 8000");
});
