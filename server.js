const http = require("http");
const fs = require("fs");

const PORT = 3000;
const JSON_FILE = "data.json";

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/data") {
    // 📌 Basahin ang JSON file
    fs.readFile(JSON_FILE, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to read file" }));
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    });
  } else if (req.method === "POST" && req.url === "/data") {
    // 📌 Magdagdag ng data sa JSON
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      fs.readFile(JSON_FILE, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Failed to read file" }));
          return;
        }
        const jsonData = JSON.parse(data);
        jsonData.push(JSON.parse(body));

        fs.writeFile(JSON_FILE, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to write file" }));
            return;
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Data added successfully!" }));
        });
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
