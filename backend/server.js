const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

const scanRoutes = require("./routes/scanRoutes");

dotenv.config();

const app = express();


// ================================
// MIDDLEWARE
// ================================

app.use(helmet());

app.use(cors());

app.use(express.json());


// ================================
// ROUTES
// ================================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "LinkShield API is running 🛡️"
    });

});

app.use("/api/scan", scanRoutes);


// ================================
// SERVER
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `🛡️ LinkShield server running on port ${PORT}`
    );

});