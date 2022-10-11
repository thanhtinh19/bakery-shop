const db = require("../../bakery-base-init");
const _ = require("lodash");

module.exports = {
    getIngredient,
    createIngredient,
    updateIngredient,
};

async function getIngredient(id = "") {
    const params = [];
    let query =
        "SELECT t1.*, t2.name AS unit FROM `ingredient` t1 JOIN unit t2 ON t1.idUnit = t2.id WHERE t1.isDeleted = 0";
    if (id) {
        query += " AND id = ?";
        params.push(id);
    }

    return await db.query(query, params);
}

async function createIngredient(info) {
    const fields = ["name", "idUnit", "quantity", "description", "isDeleted", "warningThreshold"];
    const data = _.pick(info, fields);
    const query = "INSERT INTO `ingredient` SET ?";
    await db.query(query, [data]);
}

async function updateIngredient(id, info) {
    const fields = ["name", "idUnit", "quantity", "description", "isDeleted", "warningThreshold"];
    const data = _.pick(info, fields);
    const query = "UPDATE `ingredient` SET ? WHERE id = ?";
    await db.query(query, [data, id]);
}
