const { Router } = require("express");
const router = Router();
const { renderIndex } = require("../controllers/indexControllers.js");
const { getFakeItems, getDatos, randoms } = require("../controllers/indexControllers.js");
const { isAuthenticated } = require("../helpers/auth.js");
const compression = require("compression")

router.get("/", isAuthenticated, renderIndex);
router.get("/api/productos-test", getFakeItems);
router.get("/info", getDatos);
router.get("/infozip", compression(), getDatos);
router.get("/api/randoms", randoms)

module.exports = router;
