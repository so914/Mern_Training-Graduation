const http = require("http");
const fs = require("fs");
const path = require("path");

const root = "/app";

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);

  if (urlPath === "/") {
    urlPath = "/index.html";
  }

  const filePath = path.join(root, urlPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/plain"
      });
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType
    });

    res.end(data);
  });
});

server.listen(8080, "0.0.0.0", () => {
  console.log("Server listening on :8080");
});
