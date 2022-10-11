const db = require("../../bakery-base-init");
const _ = require("lodash");

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
};

async function getProducts() {
    const query = `SELECT t1.id, t1.name, t1.description, t1.unitPrice, t1.idUnit, t2.name AS unit, t1.createdDate, t1.viewNumber,
                   (SELECT GROUP_CONCAT(t3.idType SEPARATOR ';') FROM product_type t3 WHERE t1.id = t3.idProduct) AS idTypes,
                   (SELECT GROUP_CONCAT(t4.name SEPARATOR ';') FROM image t4 WHERE t1.id = t4.idProduct) AS images,
                   (SELECT GROUP_CONCAT(CONCAT(t5.idIngredient,"-",t5.amount) SEPARATOR ';') FROM product_ingredient t5 WHERE t1.id = t5.idProduct) AS ingredients
                   FROM product t1
                   JOIN unit t2 ON t1.idUnit = t2.id
                   WHERE t1.isDeleted = 0
                   ORDER BY t1.createdDate DESC`;
    return await db.query(query, []);
}

async function getProduct(id) {
    const productQuery = `SELECT t1.*, t2.name AS unit FROM product t1 JOIN unit t2 ON t1.idUnit = t2.id WHERE t1.id = ?`;
    const product = await db.query(productQuery, [id]);

    const imagesQuery = `SELECT name FROM image WHERE idProduct = ?`;
    const images = await db.query(imagesQuery, [id]);
    const typesQuery = `SELECT t1.name FROM type t1 JOIN product_type t2 ON t1.id = t2.idType WHERE t2.idProduct = ?`;
    const types = await db.query(typesQuery, [id]);
    const ingredientsQuery = `SELECT t1.name, t2.name AS unit, t3.amount FROM ingredient t1 
                              JOIN unit t2 ON t1.idUnit = t2.id 
                              JOIN product_ingredient t3 ON t1.id = t3.idIngredient
                              WHERE t3.idProduct = ?`;
    const ingredients = await db.query(ingredientsQuery, [id]);
    const commentsQuery = `SELECT t1.content, t1.rating, t1.createdDate, t2.username, t1.idUser FROM comment t1
                           JOIN user t2 ON t1.idUser = t2.id
                           WHERE t1.idProduct = ?`;
    const comments = await db.query(commentsQuery, [id]);
    const result = {
        images,
        types,
        ingredients,
        comments,
        product: product[0],
    };
    const increaseProductViewQuery = `UPDATE product SET viewNumber = viewNumber +1 WHERE id = ?`;
    await db.query(increaseProductViewQuery, [id]);
    return result;
}

async function createProduct(info) {
    const productFields = ["name", "description", "idUnit", "unitPrice", "isDeleted", "createdDate"];
    const con = await db.getConnection();
    try {
        await db.beginTransaction(con);
        const insertProductQuery = `INSERT INTO product SET ?`;
        const productData = _.pick(info, productFields);
        const result = await db.transactionQuery(con, insertProductQuery, [productData]);
        if (info["fileNames"].length > 0) {
            const insertImageQuery = `INSERT INTO image SET ?`;
            for (let name of info["fileNames"]) {
                const imageData = {
                    name,
                    idProduct: result.insertId,
                    isDeleted: 0,
                };
                await db.transactionQuery(con, insertImageQuery, [imageData]);
            }
        }
        if (info["types"].length > 0) {
            const insertTypesQuery = `INSERT INTO product_type SET ?`;
            for (let type of info["types"]) {
                const typeData = {
                    idProduct: result.insertId,
                    idType: type,
                    isDeleted: 0,
                };
                await db.transactionQuery(con, insertTypesQuery, [typeData]);
            }
        }
        if (info["ingredientObjArr"].length > 0) {
            const insertIngredientQuery = `INSERT INTO product_ingredient SET ?`;
            for (let ingredient of info["ingredientObjArr"]) {
                const ingredientData = {
                    idProduct: result.insertId,
                    idIngredient: ingredient["idIngredient"],
                    amount: ingredient["amount"],
                    isDeleted: 0,
                };
                await db.transactionQuery(con, insertIngredientQuery, [ingredientData]);
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

async function updateProduct(id, info) {
    if (info["isDeleted"] == 1) {
        const query = `UPDATE product SET isDeleted = 1 WHERE id = ?`;
        await db.query(query, [id]);
    } else {
        const productFields = ["name", "description", "idUnit", "unitPrice"];
        const con = await db.getConnection();
        try {
            await db.beginTransaction(con);
            const productData = _.pick(info, productFields);
            const productQuery = `UPDATE product SET ? WHERE id = ?`;
            await db.transactionQuery(con, productQuery, [productData, id]);

            if (info["imageObjArr"].length > 0) {
                for (let image of info["imageObjArr"]) {
                    if (image["isDeleted"]) {
                        const deleteImageQuery = `DELETE FROM image WHERE idProduct = ? AND name = ?`;
                        await db.transactionQuery(con, deleteImageQuery, [id, image["name"]]);
                    }
                }
            }

            if (info["fileNames"].length > 0) {
                const insertImageQuery = `INSERT INTO image SET ?`;
                for (let name of info["fileNames"]) {
                    const imageData = {
                        name,
                        idProduct: id,
                        isDeleted: 0,
                    };
                    await db.transactionQuery(con, insertImageQuery, [imageData]);
                }
            }

            if (info["ingredientObjArr"].length > 0) {
                const insertIngredientQuery = `INSERT INTO product_ingredient SET ?`;
                const updateIngredientQuery = `UPDATE product_ingredient SET amount = ? WHERE idProdct = ? AND idIngredient = ?`;
                const deleteIngredientQuery = `DELETE FROM product_ingredient WHERE idProduct = ? AND idIngredient = ?`;
                for (let ingredient of info["ingredientObjArr"]) {
                    if (ingredient["isDeleted"]) {
                        await db.transactionQuery(con, deleteIngredientQuery, [id, ingredient["idIngredient"]]);
                    } else if (ingredient["isCreated"]) {
                        const ingredientData = {
                            idProduct: id,
                            idIngredient: ingredient["idIngredient"],
                            amount: ingredient["amount"],
                            isDeleted: 0,
                        };
                        await db.transactionQuery(con, insertIngredientQuery, [ingredientData]);
                    } else if (ingredient["isModified"]) {
                        await db.transactionQuery(con, updateIngredientQuery, [
                            ingredient["amount"],
                            id,
                            ingredient["idIngredient"],
                        ]);
                    }
                }
            }

            if (info["typeObjArr"]) {
                const insertTypeQuery = `INSERT INTO product_type SET ?`;
                const deleteTypeQuery = `DELETE FROM product_type WHERE idProduct = ? AND idType = ?`;
                for (let type of info["typeObjArr"]) {
                    if (type["isDeleted"]) {
                        await db.transactionQuery(con, deleteTypeQuery, [id, type["id"]]);
                    } else if (type["isCreated"]) {
                        const data = {
                            idProduct: id,
                            idType: type["id"],
                            isDeleted: 0,
                        };
                        await db.transactionQuery(con, insertTypeQuery, [data]);
                    }
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
}
