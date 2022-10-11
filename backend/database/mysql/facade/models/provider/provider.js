const db = require("../../bakery-base-init");
const _ = require("lodash");

module.exports = {
    getProvider,
    createProvider,
    updateProvider,
};

async function getProvider(id = "") {
    const params = [];
    let query = "SELECT * FROM `provider` WHERE isDeleted = 0";
    if (id) {
        query += " AND id = ?";
        params.push(id);
    }

    return await db.query(query, params);
}

async function createProvider(info) {
    const fields = ["name", "phone", "email", "address", "isDeleted"];
    const data = _.pick(info, fields);
    const query = "INSERT INTO `provider` SET ?";
    await db.query(query, [data]);
}

async function updateProvider(id, info) {
    const fields = ["name", "phone", "email", "address", "isDeleted"];
    const data = _.pick(info, fields);
    const query = "UPDATE `provider` SET ? WHERE id = ?";
    await db.query(query, [data, id]);
}
