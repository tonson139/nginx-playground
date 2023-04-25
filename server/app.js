const express = require("express");
const logger = require("morgan");

const port = process.env.PORT;
const limitFileSize = "8mb";

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: limitFileSize }));
app.use(express.urlencoded({ limit: limitFileSize, extended: true }));

app.use("/", (req, res) => {
    res.status(200).json({
        server: port,
        method: req.method,
        url: req.url,
        reqHeader: req.headers,
        reqBody: req.body,
    });
});

app.get("/user", (req, res) => {
    res.status(200).json({
        server: port,
        method: req.method,
        url: req.url,
        reqHeader: req.headers,
        reqBody: req.body,
    });
});

app.post("/user", (req, res) => {
    res.status(200).json({
        server: port,
        method: req.method,
        url: req.url,
        reqHeader: req.headers,
        reqBody: req.body,
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`limit file size ${limitFileSize}`);
});
