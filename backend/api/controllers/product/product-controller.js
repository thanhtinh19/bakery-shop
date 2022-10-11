const mysqlProduct = require("../../../database/mysql/facade/models/product/product");
const fs = require("fs");
const https = require("https");
const uuid = require("uuid");

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};

async function getProducts(req, res) {
    try {
        const data = await mysqlProduct.getProducts();
        res.json(data);
    } catch (e) {
        console.error("getProducts: ", e);
        res.status(500).send();
    }
}

async function createProduct(req, res) {
    try {
        const { name, description, idUnit, unitPrice, types, ingredientObjArr, fileBase64ObjArr } = req.body;
        const fileNames = [];
        if (fileBase64ObjArr.length > 0) {
            for (let file of fileBase64ObjArr) {
                const base64Data = file["base64"].split(",")[1];
                const img = new Buffer(base64Data, "base64");
                const fileName = uuid.v4() + ".jpg";
                fileNames.push(fileName);
                fs.writeFileSync(`${__dirname}/../../../public/img/${fileName}`, img, "base64", function (
                    err
                ) {
                    if (err) {
                        throw err;
                    }
                });
            }
        }
        const info = {
            name,
            description,
            idUnit,
            unitPrice,
            types,
            ingredientObjArr,
            fileNames,
            createdDate: new Date()
        };
        await mysqlProduct.createProduct(info);
        res.status(201).send();
    } catch (e) {
        console.error("createProduct: ", e);
        res.status(500).send();
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            idUnit,
            unitPrice,
            types,
            ingredientObjArr,
            fileBase64ObjArr,
            imageObjArr,
            typeObjArr,
        } = req.body;
        const fileNames = [];
        if (fileBase64ObjArr.length > 0) {
            for (let file of fileBase64ObjArr) {
                const base64Data = file["base64"].split(",")[1];
                const img = new Buffer(base64Data, "base64");
                const fileName = uuid.v4() + ".jpg";
                fileNames.push(fileName);
                fs.writeFileSync(`${__dirname}/../../../public/img/${fileName}`, img, "base64", function (
                    err
                ) {
                    if (err) {
                        throw err;
                    }
                });
            }
        }
        const info = {
            name,
            description,
            idUnit,
            unitPrice,
            types,
            ingredientObjArr,
            fileNames,
            imageObjArr,
            typeObjArr,
        };
        await mysqlProduct.updateProduct(id, info);
        for (let image of imageObjArr) {
            if (image["isDeleted"]) {
                fs.unlinkSync(`${__dirname}/../../../public/img/${image["name"]}`);
            }
        }
        res.status(200).send();
    } catch (e) {
        console.error("updateProduct: ", e);
        res.status(500).send();
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const info = {
            isDeleted: 1,
        };
        await mysqlProduct.updateProduct(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("deleteProduct: ", e);
        res.status(500).send();
    }
}

async function getProduct(req, res) {
    try {
        const { id } = req.params;
        const data = await mysqlProduct.getProduct(id);
        res.json(data);
    } catch (e) {
        console.error("getProduct: ", e);
        res.status(500).send();
    }
}
