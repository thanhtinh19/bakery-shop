const db = require("../../bakery-base-init");
const _ = require("lodash");

module.exports = {
    getType,
    createType,
    updateType,
};

async function getType(id = "") {
    const params = [];
    let query = "SELECT * FROM `type` WHERE isDeleted = 0";
    if (id) {
        query += " AND id = ?";
        params.push(id);
    }

    return await db.query(query, params);
}

async function createType(info) {
    const fields = ["name", "description", "isDeleted"];
    const data = _.pick(info, fields);
    const query = "INSERT INTO `type` SET ?";
    await db.query(query, [data]);
}

async function updateType(id, info) {
    const fields = ["name", "description", "isDeleted"];
    const data = _.pick(info, fields);
    const query = "UPDATE `type` SET ? WHERE id = ?";
    await db.query(query, [data, id]);
}