const { Presensi, User } = require("../models");
const { Op } = require("sequelize");

exports.getDailyReport = async (req, res) => {
  try {
    const { nama } = req.query;

    // Ambil rentang 2 hari terakhir (menghindari masalah timezone)
    const start = new Date();
    start.setDate(start.getDate() - 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const options = {
      where: {
        checkIn: {
          [Op.between]: [start, end],
        },
      },
      include: [
        {
          model: User,
          as: "user",
          ...(nama && {
            where: {
              nama: { [Op.like]: `%${nama}%` },
            },
          }),
        },
      ],
      order: [["checkIn", "DESC"]],
    };

    const data = await Presensi.findAll(options);

    res.json({ data });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil laporan",
      error: error.message,
    });
  }
};
