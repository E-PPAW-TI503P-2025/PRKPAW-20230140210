const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;
const morgan = require("morgan");
const path = require("path");

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ROUTERS
const presensiRoutes = require("./routes/presensi");
const reportRoutes = require("./routes/reports");  // pastikan nama file sama
const authRoutes = require("./routes/auth");

// Debug logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Default route
app.get("/", (req, res) => {
  res.send("Home Page for API");
});

// Books (tidak diapa-apakan)
const ruteBuku = require("./routes/books");
app.use("/api/books", ruteBuku);

// FIX DI SINI
app.use("/api/presensi", presensiRoutes);

// FIX PALING PENTING ❗
/// React memanggil: http://localhost:3001/api/report
app.use("/api/report", reportRoutes);

app.use("/api/auth", authRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
