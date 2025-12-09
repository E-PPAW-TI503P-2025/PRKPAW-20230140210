// routes/presensi.js
const express = require("express");
const router = express.Router();

const presensiController = require("../controllers/presensiController");
const authMiddleware = require("../middleware/authMiddleware");
const { addUserData } = require("../middleware/permissionMiddleware");

// CHECK-IN
router.post(
  "/check-in",
  [
    authMiddleware,
    addUserData,
    presensiController.upload.single("image")
  ],
  presensiController.CheckIn
);

// CHECK-OUT
router.post(
  "/check-out",
  [
    authMiddleware,
    addUserData,
    presensiController.upload.single("image")
  ],
  presensiController.CheckOut
);

module.exports = router;
