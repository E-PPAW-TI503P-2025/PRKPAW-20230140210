// routes/presensi.js
const express = require("express");
const router = express.Router();

const presensiController = require("../controllers/presensiController");
const authMiddleware = require("../middleware/authMiddleware");
const { addUserData } = require("../middleware/permissionMiddleware");

// /api/presensi/check-in
router.post(
  "/check-in",
  authMiddleware,   // wajib duluan → isi req.user dari JWT
  addUserData,      // cek req.user ada
  presensiController.CheckIn
);

// /api/presensi/check-out
router.post(
  "/check-out",
  authMiddleware,
  addUserData,
  presensiController.CheckOut
);

module.exports = router;
