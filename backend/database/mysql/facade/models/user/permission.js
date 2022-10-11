const db = require("../../bakery-base-init");
const _ = require("lodash");

module.exports = {
    getPermission,
    createPermission,
    updatePermission,
};

async function getPermission(id = "") {
    const params = [];
    let query = `SELECT * FROM permission WHERE isDeleted = 0`;
    if (id) {
        query += " AND id = ?";
        params.push(id);
    }

    return await db.query(query, params);
}

async function createPermission(info) {
    const fields = ["name", "description", "isDeleted"];
    const data = _.pick(info, fields);
    const query = `INSERT INTO permission SET ?`;
    await db.query(query, [data]);
}

async function updatePermission(id, info) {
    const fields = ["name", "description", "isDeleted"];
    const data = _.pick(info, fields);
    const query = `UPDATE permission SET ? WHERE id = ?`;
    await db.query(query, [data, id]);
}