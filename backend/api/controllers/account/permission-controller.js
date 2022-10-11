const mysqlPermission = require("../../../database/mysql/facade/models/user/permission");

module.exports = {
    getAllPermission,
    getPermission,
    createPermission,
    updatePermission,
    deletePermission,
};

async function getAllPermission(req, res) {
    try {
        const data = await mysqlPermission.getPermission();
        res.json(data);
    } catch (e) {
        console.error("getAllPermission: ", e);
        res.status(500).send();
    }
}

async function getPermission(req, res) {
    try {
        const { id } = req.params;
        const data = await mysqlPermission.getPermission(id);
        res.json(data);
    } catch (e) {
        console.error("getPermission: ", e);
        res.status(500).send();
    }
}

async function createPermission(req, res) {
    try {
        const { name, description } = req.body;
        const info = {
            name,
            description,
            isDeleted: 0,
        };
        await mysqlPermission.createPermission(info);
        res.status(201).send();
    } catch (e) {
        console.error("createPermission: ", e);
        res.status(500).send();
    }
}

async function updatePermission(req, res) {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const info = {
            name,
            description,
        };
        await mysqlPermission.updatePermission(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("updatePermission: ", e);
        res.status(500).send();
    }
}

async function deletePermission(req, res) {
    try {
        const { id } = req.params;
        const info = {
            isDeleted: 1,
        };
        await mysqlPermission.updatePermission(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("deletePermission: ", e);
        res.status(500).send();
    }
}
