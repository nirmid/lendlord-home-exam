const Router = require("koa-router");
const router = new Router();

const ctrl = require("../controllers/users");

router.get("/user/:id", ctrl.getUserById);

router.get("/users", ctrl.getAllUsers);

router.post("/user", ctrl.createUser);

router.put("/user/:id", ctrl.updateUser);

router.delete("/user/:id", ctrl.deleteUser);

router.get("/search", ctrl.searchByManager);

router.post("/sort", ctrl.sortBySalary);

router.allowedMethods();

module.exports = router;
