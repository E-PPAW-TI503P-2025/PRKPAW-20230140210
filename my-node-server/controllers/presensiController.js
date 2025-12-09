const { Presensi } = require("../models");
const { format } = require("date-fns-tz");
const timeZone = "Asia/Jakarta";
const multer = require('multer');
const path = require('path');

// ===== STORAGE FOTO =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error("Hanya file gambar!"), false);
};

exports.upload = multer({ storage, fileFilter });


// ===== CHECK-IN =====
exports.CheckIn = async (req, res) => {
  try {
    const { id: userId, nama: userName } = req.user;
    const waktuSekarang = new Date();
    const { latitude, longitude } = req.body;

    const buktiFoto = req.file ? req.file.path : null;

    // Cegah double check-in
    const existingRecord = await Presensi.findOne({
      where: { userId, checkOut: null }
    });

    if (existingRecord) {
      return res.status(400).json({
        message: "Anda sudah melakukan check-in."
      });
    }

    const newRecord = await Presensi.create({
      userId,
      checkIn: waktuSekarang,
      latitude: latitude || null,
      longitude: longitude || null,
      buktiFoto
    });

    res.status(201).json({
      message: `Halo ${userName}, check-in berhasil pukul ${format(waktuSekarang,"HH:mm:ss",{ timeZone })} WIB`,
      data: newRecord
    });

  } catch (error) {
    console.log("CheckIn Error:", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message
    });
  }
};


// ===== CHECK-OUT =====
exports.CheckOut = async (req, res) => {
  try {
    const { id: userId, nama: userName } = req.user;
    const waktuSekarang = new Date();

    const record = await Presensi.findOne({
      where: { userId, checkOut: null },
    });

    if (!record) {
      return res.status(404).json({
        message: "Tidak ada check-in aktif.",
      });
    }

    record.checkOut = waktuSekarang;
    await record.save();

    res.json({
      message: `Check-out berhasil pukul ${format(waktuSekarang, "HH:mm:ss", { timeZone })} WIB`,
      data: record,
    });

  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};
