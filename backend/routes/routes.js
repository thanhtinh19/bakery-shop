const loginController = require("../api/controllers/account/login-controller");
const permissionController = require("../api/controllers/account/permission-controller");
const productTypeController = require("../api/controllers/product/type-controller");
const productController = require("../api/controllers/product/product-controller");
const productCommentController = require("../api/controllers/product/comment-controller");
const unitController = require("../api/controllers/unit/unit-controller");
const providerController = require("../api/controllers/provider/provider-controller");
const ingredientController = require("../api/controllers/ingredient/ingredient-controller");
const exportReceiptController = require("../api/controllers/export-receipt/export-receipt-controller");
const userController = require("../api/controllers/account/user-controller");
const verifyToken = require("../api/middleware/verifyToken");
const checkPermission = require("../api/middleware/checkPermission");

function routes(app) {
    app.namespace("/api", function () {
        app.post("/login", loginController.getToken);
        app.post("/verify-username", userController.checkUsername);
        // permission
        app.get("/permission", permissionController.getAllPermission);
        app.get("/permission/:id", permissionController.getPermission);
        app.post("/permission", permissionController.createPermission);
        app.patch("/permission/:id", permissionController.updatePermission);
        app.delete("/permission/:id", permissionController.deletePermission);
        // user
        app.get("/user", userController.getAllUser);
        app.post("/user", userController.createUser);
        app.patch("/user/:id", userController.updateUser);
        app.delete("/user/:id", userController.deleteUser);
        // export receipt
        app.get("/export-receipt/status", exportReceiptController.getAllStatus);
        app.get("/export-receipt/status/:id", exportReceiptController.getStatus);
        app.post("/export-receipt/status", exportReceiptController.createStatus);
        app.patch("/export-receipt/status/:id", exportReceiptController.updateStatus);
        app.delete("/export-receipt/status/:id", exportReceiptController.deleteStatus);
        app.get("/export-receipt/detail/:id", exportReceiptController.getDetailExportReceipt);
        app.get("/export-receipt", exportReceiptController.getAllExportReceipt);
        app.get("/user-export-receipt", exportReceiptController.getUserExportReceipt);
        app.post("/export-receipt", exportReceiptController.createExportReceipt);
        app.patch("/export-receipt/:id", exportReceiptController.updateExportReceipt);
        // product
        app.post("/product/comment", productCommentController.createComment);
        app.get("/product/type", productTypeController.getAllType);
        app.get("/product/type/:id", productTypeController.getType);
        app.post("/product/type", productTypeController.createType);
        app.patch("/product/type/:id", productTypeController.updateType);
        app.delete("/product/type/:id", productTypeController.deleteType);
        app.get("/product/:id", productController.getProduct);
        app.get("/product", productController.getProducts);
        app.post("/product", productController.createProduct);
        app.patch("/product/:id", productController.updateProduct);
        app.delete("/product/:id", productController.deleteProduct);
        // unit
        app.get("/unit", unitController.getAllUnit);
        app.get("/unit/:id", unitController.getUnit);
        app.post("/unit", unitController.createUnit);
        app.patch("/unit/:id", unitController.updateUnit);
        app.delete("/unit/:id", unitController.deleteUnit);
        // provider
        app.get("/provider", providerController.getAllProvider);
        app.get("/provider/:id", providerController.getProvider);
        app.post("/provider", providerController.createProvider);
        app.patch("/provider/:id", providerController.updateProvider);
        app.delete("/provider/:id", providerController.deleteProvider);
        // ingredient
        app.get("/ingredient", ingredientController.getAllIngredient);
        app.get("/ingredient/:id", ingredientController.getIngredient);
        app.post("/ingredient", ingredientController.createIngredient);
        app.patch("/ingredient/:id", ingredientController.updateIngredient);
        app.delete("/ingredient/:id", ingredientController.deleteIngredient);

    });
}

module.exports = routes;
