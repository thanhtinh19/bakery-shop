const mysqlType = require("../../../database/mysql/facade/models/product/type");

module.exports = {
    getAllType,
    getType,
    createType,
    updateType,
    deleteType,
};

async function getAllType(req, res) {
    try {
        const data = await mysqlType.getType();
        res.json(data);
    } catch (e) {
        console.error("getAllType: ", e);
        res.status(500).send();
    }
}

async function getType(req, res) {
    try {
        const { id } = req.params;
        const data = await mysqlType.getType(id);
        res.json(data);
    } catch (e) {
        console.error("getType: ", e);
        res.status(500).send();
    }
}

async function createType(req, res) {
    try {
        const { name, description } = req.body;
        const info = {
            name,
            description,
            isDeleted: 0,
        };
        await mysqlType.createType(info);
        res.status(201).send();
    } catch (e) {
        console.error("createType: ", e);
        res.status(500).send();
    }
}

async function updateType(req, res) {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const info = {
            name,
            description,
        };
        await mysqlType.updateType(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("updateType: ", e);
        res.status(500).send();
    }
}

async function deleteType(req, res) {
    try {
        const { id } = req.params;
        const info = {
            isDeleted: 1,
        };
        await mysqlType.updateType(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("deleteType: ", e);
        res.status(500).send();
    }
}
