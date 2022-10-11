const mysqlProvider = require("../../../database/mysql/facade/models/provider/provider");

module.exports = {
    getAllProvider,
    getProvider,
    createProvider,
    updateProvider,
    deleteProvider,
};

async function getAllProvider(req, res) {
    try {
        const data = await mysqlProvider.getProvider();
        res.json(data);
    } catch (e) {
        console.error("getAllProvider: ", e);
        res.status(500).send();
    }
}

async function getProvider(req, res) {
    try {
        const { id } = req.params;
        const data = await mysqlProvider.getProvider(id);
        res.json(data);
    } catch (e) {
        console.error("getProvider: ", e);
        res.status(500).send();
    }
}

async function createProvider(req, res) {
    try {
        const { name, phone, email, address } = req.body;
        const info = {
            name,
            phone,
            email,
            address,
            isDeleted: 0,
        };
        await mysqlProvider.createProvider(info);
        res.status(201).send();
    } catch (e) {
        console.error("createProvider: ", e);
        res.status(500).send();
    }
}

async function updateProvider(req, res) {
    try {
        const { id } = req.params;
        const { name, phone, email, address } = req.body;
        const info = {
            name,
            phone,
            email,
            address,
        };
        await mysqlProvider.updateProvider(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("updateProvider: ", e);
        res.status(500).send();
    }
}

async function deleteProvider(req, res) {
    try {
        const { id } = req.params;
        const info = {
            isDeleted: 1,
        };
        await mysqlProvider.updateProvider(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("deleteProvider: ", e);
        res.status(500).send();
    }
}
