const db = require("../../bakery-base-init");
const _ = require("lodash");

module.exports = {
    getUserLoginInfo,
    getUserPermission,
    checkUsername,
    getAllUser,
    createUser,
    updateUser,
    getCurrentPassword
}

async function getUserLoginInfo(username) {
    const query =`SELECT * FROM user WHERE username = ?`;
    const result = await db.query(query, [username]);
    return result[0];
}

async function getUserPermission(id) {
    const query = `SELECT id, name FROM permission WHERE id = ?`;
    const result = await db.query(query, [id]);
    return result[0];
}

async function checkUsername(name) {
    const query = `SELECT username FROM user WHERE username = ?`;
    return await db.query(query, [name]);
}

async function getAllUser() {
    const query =`SELECT t1.id, t1.username, t1.email, t1.phone, t1.fullName, t1.address, t1.idPermission, t2.name AS permissionName
                  FROM user t1
                  JOIN permission t2 ON t1.idPermission = t2.id
                  WHERE t1.isDeleted = 0`;
    return await db.query(query, []);
}

async function createUser(info) {
    const fields = ["username", "password", "email", "phone", "fullName", "address", "idPermission"];
    const data = _.pick(info, fields);
    const query = `INSERT INTO user SET ?`;
    await db.query(query, [data]);
}

async function updateUser(id, info) {
    const fields = ["password", "email", "phone", "fullName", "address", "isDeleted", "idPermission"];
    const data = _.pick(info, fields);
    const query = `UPDATE user SET ? WHERE id = ?`;
    await db.query(query, [data, id]);
}

async function getCurrentPassword(id) {
    const query = `SELECT password FROM user WHERE id = ?`;
    const result = await db.query(query, [id]);
    return result[0];
}