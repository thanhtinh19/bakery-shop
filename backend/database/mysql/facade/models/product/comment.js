const db = require("../../bakery-base-init");
const _ = require("lodash");

module.exports = {
    createComment,
};

async function createComment(info) {
    const fields = ["idProduct", "idUser", "content", "rating", "createdDate"];
    const data = _.pick(info, fields);
    const query = "INSERT INTO `comment` SET ?";
    await db.query(query, [data]);
}
