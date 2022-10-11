const mysqlComment = require("../../../database/mysql/facade/models/product/comment");

module.exports = {
    createComment,
};

async function createComment(req, res) {
    try {
        const { idProduct, content, rating } = req.body;
        const { userId } = req.user;
        const info = {
            idProduct,
            idUser: userId,
            content,
            rating,
            createdDate: new Date(),
        };
        await mysqlComment.createComment(info);
        res.status(201).send();
    } catch (e) {
        console.error("createComment: ", e);
        res.status(500).send();
    }
}
