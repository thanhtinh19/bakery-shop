const db = require("../../bakery-base-init");
const _ = require("lodash");

module.exports = {
    getStatus,
    createStatus,
    updateStatus,
    createExportReceipt,
    getExportReceipts,
    updateExportReceipts,
    getDetailExportReceipt,
};

async function getStatus(id = "") {
    const params = [];
    let query = `SELECT * FROM export_receipt_status WHERE isDeleted = 0`;
    if (id) {
        query += ` AND id = ?`;
        params.push(id);
    }
    return await db.query(query, params);
}

async function createStatus(info) {
    const fields = ["name", "isDeleted", "description"];
    const data = _.pick(info, fields);
    const query = `INSERT INTO export_receipt_status SET ?`;
    await db.query(query, [data]);
}

async function updateStatus(id, info) {
    const fields = ["name", "isDeleted", "description"];
    const data = _.pick(info, fields);
    const query = `UPDATE export_receipt_status SET ? WHERE id = ?`;
    await db.query(query, [data, id]);
}

async function createExportReceipt(info) {
    const con = await db.getConnection();
    try {
        await db.beginTransaction(con);

        const receiptFields = [
            "date",
            "totalPrice",
            "idUser",
            "isDeleted",
            "status",
            "fullName",
            "address",
            "phone",
            "note",
        ];
        const receiptData = _.pick(info, receiptFields);
        const insertReceiptQuery = `INSERT INTO export_receipt SET ?`;
        const result = await db.transactionQuery(con, insertReceiptQuery, [receiptData]);

        if (info["products"].length > 0) {
            const insertProductReceiptQuery = `INSERT INTO detail_export_receipt SET ?`;
            for (let product of info["products"]) {
                const data = {
                    idReceipt: result.insertId,
                    amount: product["amount"],
                    idProduct: product["id"],
                    totalPrice: product["totalPrice"],
                    isDeleted: 0,
                };
                await db.transactionQuery(con, insertProductReceiptQuery, [data]);
            }
        }

        await db.commitTransaction(con);
    } catch (e) {
        await db.rollbackTransaction(con);
        throw e;
    } finally {
        con.destroy();
    }
}

async function getExportReceipts(userId = "") {
    const params = [];
    let receiptQuery = `SELECT t1.*, t2.description AS statusName FROM export_receipt t1
                          JOIN export_receipt_status t2 ON t1.idStatus = t2.id`;
    if (userId) {
        receiptQuery += " WHERE t1.idUser = ?";
        params.push(userId);
    }
    receiptQuery += " ORDER BY t1.date DESC";
    return await db.query(receiptQuery, params);
}

async function updateExportReceipts(id, status) {
    const query = `UPDATE export_receipt SET status = ? WHERE id = ?`;
    await db.query(query, [status, id]);
}

async function getDetailExportReceipt(id) {
    const receiptQuery = `SELECT * FROM export_receipt WHERE id = ?`;
    const receiptInfo = await db.query(receiptQuery, [id]);

    const receiptProductsQuery = `SELECT t1.*, (SELECT GROUP_CONCAT(t3.name SEPARATOR ';') FROM image t3 WHERE t3.idProduct = t1.idProduct) AS images, t2.name, t2.unitPrice, t4.name AS unit 
                                  FROM detail_export_receipt t1 
                                  JOIN product t2 ON t1.idProduct = t2.id
                                  JOIN unit t4 ON t2.idUnit = t4.id                     
                                  WHERE t1.idReceipt = ?`;
    const receiptProducts = await db.query(receiptProductsQuery, [id]);

    const result = {
        info: receiptInfo[0],
        products: receiptProducts,
    };
    return result;
}
