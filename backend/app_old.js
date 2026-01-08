const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World from backend!"));

app.listen(3000, () => console.log("Backend on http://localhost:3000"));