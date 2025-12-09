const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { getDailyReport } = require("../controllers/reportController");

// FINAL ROUTE FIX:
// Frontend memanggil: /api/report  → backend harus handle: "/"
router.get("/", auth, getDailyReport);

module.exports = router;
