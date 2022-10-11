const _var = require("../../utils/_var");

const checkPermission = (permissionName) => (req, res, next) => {
    try {
        const user = req.user;
        if (user.permissionName == _var.permission[permissionName]) {
            next();
        } else {
            res.status(403).send();
        }
    } catch (e) {
        console.error("checkPermission: ", e);
        res.status(500).json({});
    }
}

module.exports = checkPermission;
