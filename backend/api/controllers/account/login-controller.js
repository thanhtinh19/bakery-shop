const basicAuth = require("basic-auth");
const mysqlUser = require("../../../database/mysql/facade/models/user/user");
const md5 = require("md5");
const _var = require("../../../utils/_var");
const jwt = require("jsonwebtoken");

module.exports = {
    getToken,
};

async function getToken(req, res) {
    try {
        const loginInfo = basicAuth(req);
        if (loginInfo) {
            let { name, pass } = loginInfo;
            const user = await mysqlUser.getUserLoginInfo(name);
            if (!user || md5(pass) != user.password) {
                res.status(401).send();
            } else {
                const permission = await mysqlUser.getUserPermission(user.idPermission);
                const tokenPayload = {
                    userId: user.id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    fullName: user.fullName,
                    address: user.address,
                    permissionName: permission.name,
                    idPermission: permission.id,
                };
                const token = jwt.sign(tokenPayload, _var.jwt.tokenSecret, {
                    algorithm: _var.jwt.algorithm,
                    expiresIn: _var.jwt.tokenLife,
                });
                res.json(token);
            }
        } else {
            res.status(401).send();
        }
    } catch (e) {
        console.error("login: ", e);
        res.status(500).send();
    }
}
