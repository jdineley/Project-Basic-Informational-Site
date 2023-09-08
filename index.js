const http = require("http");
const fs = require("fs");
const path = require("path");

const validPaths = ["/", "/about", "/contact-me"];

const server = http
  .createServer((req, res) => {
    if (validPaths.includes(req.url)) {
      let page;
      switch (req.url) {
        case "/":
          page = "index.html";
          break;
        case "/about":
          page = "about.html";
          break;
        case "/contact-me":
          page = "contact-me.html";
      }

      fs.readFile(
        path.join(__dirname, "./pages", page),
        "utf8",
        (err, data) => {
          console.log("handling");
          if (err) throw err;
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html");
          res.write(data);
          res.end();
        }
      );
      return;
    }
    this.emit("error");
  })
  .listen(8080, () => console.log("listening on port 8080"));

server.on("error", (e) => {
  fs.readFile(
    path.join(__dirname, "./pages", "404.html"),
    "utf8",
    (err, data) => {
      console.log("handling");
      if (err) throw err;
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    }
  );
});
