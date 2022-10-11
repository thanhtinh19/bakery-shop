const mysqlUser = require("../../../database/mysql/facade/models/user/user");
const md5 = require("md5");
const _var = require("../../../utils/_var");

module.exports = {
    checkUsername,
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
};

async function checkUsername(req, res) {
    try {
        const { username } = req.body;
        if (!username) {
            res.status(400).send();
        } else {
            const data = await mysqlUser.checkUsername(username);
            if (data.length > 0) {
                res.status(400).send();
            } else {
                res.status(200).send();
            }
        }
    } catch (e) {
        console.error("checkUsername: ", e);
        res.status(500).send();
    }
}

async function getAllUser(req, res) {
    try {
        if (req.user.permissionName == _var.permission.admin) {
            const data = await mysqlUser.getAllUser();
            res.json(data);
        } else {
            res.status(403).send();
        }
    } catch (e) {
        console.error("getAllUser: ", e);
        res.status(500).send();
    }
}

async function createUser(req, res) {
    try {
        const {
            createUsername,
            createPassword,
            createFullName,
            createEmail,
            createPhone,
            createAddress,
            permission,
        } = req.body;
        const info = {
            username: createUsername,
            password: md5(createPassword),
            fullName: createFullName,
            email: createEmail,
            phone: createPhone,
            address: createAddress,
            idPermission: permission ? permission : 2,
        };
        await mysqlUser.createUser(info);
        res.status(201).send();
    } catch (e) {
        console.error("createUser: ", e);
        res.status(500).send();
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword, fullName, email, phone, address } = req.body;
        const user = await mysqlUser.getCurrentPassword(id);
        if (md5(currentPassword) == user.password) {
            const info = {
                fullName,
                email,
                phone,
                address,
            };
            if (newPassword) {
                info.password = md5(newPassword);
            }
            await mysqlUser.updateUser(id, info);
            res.status(200).send();
        } else {
            const msg = "Sai mật khẩu tài khoản.";
            res.status(403).json({ msg });
        }
    } catch (e) {
        console.error("updateUser: ", e);
        res.status(500).send();
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const { permissionName } = req.user;
        if (permissionName == _var.permission.admin) {
            const info = {
                isDeleted: 1,
            };
            await mysqlUser.updateUser(id, info);
            res.status(200).send();
        } else {
            res.status(403).send();
        }
    } catch (e) {
        console.error("deleteUser: ", e);
        res.status(500).send();
    }
}
