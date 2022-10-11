const db = require("../../bakery-base-init");
const _ = require("lodash");

module.exports = {
    getUnit,
    createUnit,
    updateUnit,
};

async function getUnit(id = "") {
    const params = [];
    let query = "SELECT * FROM `unit` WHERE isDeleted = 0";
    if (id) {
        query += " AND id = ?";
        params.push(id);
    }

    return await db.query(query, params);
}

async function createUnit(info) {
    const fields = ["name", "description", "isDeleted"];
    const data = _.pick(info, fields);
    const query = "INSERT INTO `unit` SET ?";
    await db.query(query, [data]);
}

async function updateUnit(id, info) {
    const fields = ["name", "description", "isDeleted"];
    const data = _.pick(info, fields);
    const query = "UPDATE `unit` SET ? WHERE id = ?";
    await db.query(query, [data, id]);
}