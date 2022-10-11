const _var = require("../../utils/_var");
const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
    try {
        const jwtToken = req.headers.token || req.headers["x-access-token"];

        if (jwtToken) {
            try {
                const userInfo = await jwt.verify(jwtToken, _var.jwt.tokenSecret);
                req.user = userInfo;

                next();
            } catch (e) {
                console.error("verifyToken: ", e);
                res.status(401).send();
            }
        } else {
            res.status(401).json({ msg: "Token not found" });
        }
    } catch (e) {
        console.error("verifyToken: ", e);
        res.status(500).json({});
    }
}

module.exports = verifyToken;
