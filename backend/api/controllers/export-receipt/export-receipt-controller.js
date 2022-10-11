const mysqlExportReceipt = require("../../../database/mysql/facade/models/export-receipt/export-receipt");
const _var = require("../../../utils/_var");

module.exports = {
    getAllStatus,
    getStatus,
    createStatus,
    updateStatus,
    deleteStatus,
    createExportReceipt,
    updateExportReceipt,
    getAllExportReceipt,
    getUserExportReceipt,
    getDetailExportReceipt,
};

async function getAllStatus(req, res) {
    try {
        const data = await mysqlExportReceipt.getStatus();
        res.json(data);
    } catch (e) {
        console.error("getAllStatus: ", e);
        res.status(500).send();
    }
}

async function getStatus(req, res) {
    try {
        const { id } = req.params;
        const data = await mysqlExportReceipt.getStatus(id);
        res.json(data);
    } catch (e) {
        console.error("getStatus: ", e);
        res.status(500).send();
    }
}

async function createStatus(req, res) {
    try {
        const { name, description } = req.body;
        const info = {
            name,
            description,
            isDeleted: 0,
        };
        await mysqlExportReceipt.createStatus(info);
        res.status(201).send();
    } catch (e) {
        console.error("createStatus: ", e);
        res.status(500).send();
    }
}

async function updateStatus(req, res) {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const info = {
            name,
            description,
        };
        await mysqlExportReceipt.updateStatus(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("updateStatus: ", e);
        res.status(500).send();
    }
}

async function deleteStatus(req, res) {
    try {
        const { id } = req.params;
        const info = {
            isDeleted: 1,
        };
        await mysqlExportReceipt.updateStatus(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("deleteStatus: ", e);
        res.status(500).send();
    }
}

async function createExportReceipt(req, res) {
    try {
        const products = [...req.body.products];
        if (products.length > 0) {
            const { idUser, fullName, address, phone, note } = req.body;
            let totalPrice = 0;
            for (let product of products) {
                product["totalPrice"] = product["unitPrice"] * product["amount"];
                totalPrice += product["totalPrice"];
            }
            const info = {
                date: new Date(),
                status: _var.export_receipt_status.pending,
                isDeleted: 0,
                idUser: idUser ? idUser : null,
                fullName,
                address,
                phone,
                note,
                totalPrice,
                products,
            };
            await mysqlExportReceipt.createExportReceipt(info);
            res.status(201).send();
        } else {
            res.status(400).send();
        }
    } catch (e) {
        console.error("createExportReceipt: ", e);
        res.status(500).send();
    }
}

async function updateExportReceipt(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await mysqlExportReceipt.updateExportReceipts(id, status);
        res.status(200).send();
    } catch (e) {
        console.error("updateExportReceipt: ", e);
        res.status(500).send();
    }
}

async function getAllExportReceipt(req, res) {
    try {
        const data = await mysqlExportReceipt.getExportReceipts();
        res.json(data);
    } catch (e) {
        console.error("getExportReceipt: ", e);
        res.status(500).send();
    }
}

async function getUserExportReceipt(req, res) {
    try {
        const { userId } = req.user;
        const data = await mysqlExportReceipt.getExportReceipts(userId);
        res.json(data);
    } catch (e) {
        console.error("getUserExportReceipt: ", e);
        res.status(500).send();
    }
}

async function getDetailExportReceipt(req, res) {
    try {
        const { id } = req.params;
        const { userId, permissionName } = req.user;
        const data = await mysqlExportReceipt.getDetailExportReceipt(id);
        if (permissionName == _var.permission.admin || userId == data["info"]["idUser"]) {
            res.json(data);
        } else {
            res.status(401).send();
        }
    } catch (e) {
        console.error("getDetailExportReceipt: ", e);
        res.status(500).send();
    }
}
