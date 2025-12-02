// middleware/permissionMiddleware.js

exports.addUserData = (req, res, next) => {
  if (!req.user) {
    console.log(
      "permissionMiddleware: req.user belum terisi. Pastikan authMiddleware dijalankan sebelum middleware ini."
    );
    return res
      .status(401)
      .json({ message: "Pengguna belum terautentikasi." });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    console.log("Middleware: Izin admin diberikan.");
    next();
  } else {
    console.log("Middleware: Gagal! Pengguna bukan admin.");
    return res
      .status(403)
      .json({ message: "Akses ditolak: Hanya untuk admin" });
  }
};
