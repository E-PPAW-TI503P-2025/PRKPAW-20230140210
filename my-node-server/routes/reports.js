const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { getDailyReport } = require("../controllers/reportController");

router.get("/daily", auth, getDailyReport);

module.exports = router;
