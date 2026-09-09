const express = require("express");

const analyzeURL = require("../services/urlAnalyzer");

const router = express.Router();

router.post("/", (req, res) => {

    try {

        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL is required."
            });
        }

        const result = analyzeURL(url);

        return res.json({
            success: true,
            result
        });

    } catch (error) {

        console.error("Scan error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while scanning the URL."
        });
    }
});

module.exports = router;