const jwt = require("jsonwebtoken");
const SECRET = "rahasia_super_duper";

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "Token tidak ditemukan." });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(401).json({ message: "Format token tidak valid." });

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = {
      id: decoded.id,
      nama: decoded.nama,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.log("AuthMiddleware error:", err.message);
    return res
      .status(401)
      .json({ message: "Token tidak valid atau kadaluarsa." });
  }
};
