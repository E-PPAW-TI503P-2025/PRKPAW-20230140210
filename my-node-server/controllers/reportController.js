const { Presensi, User } = require("../models");
const { Op } = require("sequelize");
const { zonedTimeToUtc } = require("date-fns-tz");

exports.getDailyReport = async (req, res) => {
  try {
    const { nama } = req.query;

    // Ambil waktu WIB (Asia/Jakarta)
    const timeZone = "Asia/Jakarta";

    // Awal hari WIB
    const startWIB = zonedTimeToUtc(
      new Date().toLocaleString("en-US", { timeZone }),
      timeZone
    );
    startWIB.setHours(0, 0, 0, 0);

    // Akhir hari WIB
    const endWIB = zonedTimeToUtc(
      new Date().toLocaleString("en-US", { timeZone }),
      timeZone
    );
    endWIB.setHours(23, 59, 59, 999);

    const includeUser = {
      model: User,
      as: "user",
    };

    if (nama) {
      includeUser.where = { nama: { [Op.like]: `%${nama}%` } };
    }

    const data = await Presensi.findAll({
      where: {
        checkIn: {
          [Op.between]: [startWIB, endWIB],
        },
      },
      include: [includeUser],
      order: [["checkIn", "DESC"]],
    });

    res.json({ data });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil laporan",
      error: error.message,
    });
  }
};
