const express = require("express");
require("express-namespace");
const cors = require("cors");
const session = require("express-session");

const app = express();

app.use(
    express.json({
        limit: "50mb",
    })
);
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(
    session({
        secret: "wonderfulSecretCode",
    })
);

app.get("/", (req, res) => {
    res.json({ status: true });
});

app.use("/public", express.static(`${__dirname}/public`));

require("./routes/routes")(app);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server started");
});
