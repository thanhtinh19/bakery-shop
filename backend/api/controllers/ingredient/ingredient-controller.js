const mysqlIngredient = require("../../../database/mysql/facade/models/ingredient/ingredient");

module.exports = {
    getAllIngredient,
    getIngredient,
    createIngredient,
    updateIngredient,
    deleteIngredient,
};

async function getAllIngredient(req, res) {
    try {
        const data = await mysqlIngredient.getIngredient();
        res.json(data);
    } catch (e) {
        console.error("getAllIngredient: ", e);
        res.status(500).send();
    }
}

async function getIngredient(req, res) {
    try {
        const { id } = req.params;
        const data = await mysqlIngredient.getIngredient(id);
        res.json(data);
    } catch (e) {
        console.error("getIngredient: ", e);
        res.status(500).send();
    }
}

async function createIngredient(req, res) {
    try {
        const { name, idUnit, description, warningThreshold } = req.body;
        const info = {
            name,
            idUnit,
            quantity: 0,
            description,
            isDeleted: 0,
            warningThreshold,
        };
        await mysqlIngredient.createIngredient(info);
        res.status(201).send();
    } catch (e) {
        console.error("createIngredient: ", e);
        res.status(500).send();
    }
}

async function updateIngredient(req, res) {
    try {
        const { id } = req.params;
        const { name, idUnit, quantity, description, warningThreshold } = req.body;
        const info = {
            name,
            idUnit,
            quantity,
            description,
            warningThreshold,
        };
        await mysqlIngredient.updateIngredient(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("updateIngredient: ", e);
        res.status(500).send();
    }
}

async function deleteIngredient(req, res) {
    try {
        const { id } = req.params;
        const info = {
            isDeleted: 1,
        };
        await mysqlIngredient.updateIngredient(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("deleteIngredient: ", e);
        res.status(500).send();
    }
}
