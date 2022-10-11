const mysqlUnit = require("../../../database/mysql/facade/models/unit/unit");

module.exports = {
    getAllUnit,
    getUnit,
    createUnit,
    updateUnit,
    deleteUnit,
};

async function getAllUnit(req, res) {
    try {
        const data = await mysqlUnit.getUnit();
        res.json(data);
    } catch (e) {
        console.error("getAllUnit: ", e);
        res.status(500).send();
    }
}

async function getUnit(req, res) {
    try {
        const { id } = req.params;
        const data = await mysqlUnit.getUnit(id);
        res.json(data);
    } catch (e) {
        console.error("getUnit: ", e);
        res.status(500).send();
    }
}

async function createUnit(req, res) {
    try {
        const { name, description } = req.body;
        const info = {
            name,
            description,
            isDeleted: 0,
        };
        await mysqlUnit.createUnit(info);
        res.status(201).send();
    } catch (e) {
        console.error("createUnit: ", e);
        res.status(500).send();
    }
}

async function updateUnit(req, res) {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const info = {
            name,
            description,
        };
        await mysqlUnit.updateUnit(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("updateUnit: ", e);
        res.status(500).send();
    }
}

async function deleteUnit(req, res) {
    try {
        const { id } = req.params;
        const info = {
            isDeleted: 1,
        };
        await mysqlUnit.updateUnit(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("deleteUnit: ", e);
        res.status(500).send();
    }
}
