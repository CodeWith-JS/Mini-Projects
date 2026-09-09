const { URL } = require("url");

function analyzeURL(input) {
    let parsedURL;

    try {
        parsedURL = new URL(input);
    } catch (error) {
        return {
            valid: false,
            score: 0,
            riskLevel: "INVALID",
            message: "The URL format is invalid."
        };
    }

    let score = 100;
    const checks = [];

    // --------------------------------
    // HTTPS CHECK
    // --------------------------------

    if (parsedURL.protocol === "https:") {
        checks.push({
            name: "HTTPS encryption",
            status: "safe",
            message: "Connection uses HTTPS."
        });
    } else {
        score -= 20;

        checks.push({
            name: "HTTPS encryption",
            status: "warning",
            message: "The URL does not use HTTPS."
        });
    }

    // --------------------------------
    // IP ADDRESS CHECK
    // --------------------------------

    const hostname = parsedURL.hostname;

    const ipPattern =
        /^(?:\d{1,3}\.){3}\d{1,3}$/;

    if (ipPattern.test(hostname)) {
        score -= 20;

        checks.push({
            name: "IP address",
            status: "warning",
            message: "The URL uses an IP address instead of a domain name."
        });
    } else {
        checks.push({
            name: "Domain",
            status: "safe",
            message: "A normal domain name is being used."
        });
    }

    // --------------------------------
    // SUSPICIOUS KEYWORDS
    // --------------------------------

    const suspiciousWords = [
        "login",
        "verify",
        "verification",
        "password",
        "account",
        "update",
        "secure",
        "confirm",
        "bank",
        "wallet",
        "signin",
        "free"
    ];

    const fullURL = input.toLowerCase();

    const foundWords = suspiciousWords.filter(word =>
        fullURL.includes(word)
    );

    if (foundWords.length >= 3) {
        score -= 25;

        checks.push({
            name: "Suspicious keywords",
            status: "danger",
            message: `Found ${foundWords.length} suspicious keywords.`
        });
    } else if (foundWords.length > 0) {
        score -= 10;

        checks.push({
            name: "Suspicious keywords",
            status: "warning",
            message: `Found: ${foundWords.join(", ")}`
        });
    } else {
        checks.push({
            name: "Suspicious keywords",
            status: "safe",
            message: "No obvious suspicious keywords detected."
        });
    }

    // --------------------------------
    // URL LENGTH
    // --------------------------------

    if (input.length > 150) {
        score -= 15;

        checks.push({
            name: "URL length",
            status: "warning",
            message: "The URL is unusually long."
        });
    } else {
        checks.push({
            name: "URL length",
            status: "safe",
            message: "URL length looks normal."
        });
    }

    // --------------------------------
    // PORT CHECK
    // --------------------------------

    if (parsedURL.port) {
        const commonPorts = ["80", "443"];

        if (!commonPorts.includes(parsedURL.port)) {
            score -= 15;

            checks.push({
                name: "Port",
                status: "warning",
                message: `Unusual port detected: ${parsedURL.port}`
            });
        } else {
            checks.push({
                name: "Port",
                status: "safe",
                message: "Common web port detected."
            });
        }
    } else {
        checks.push({
            name: "Port",
            status: "safe",
            message: "No unusual port detected."
        });
    }

    // --------------------------------
    // @ SYMBOL CHECK
    // --------------------------------

    if (input.includes("@")) {
        score -= 25;

        checks.push({
            name: "URL structure",
            status: "danger",
            message: "The URL contains an @ symbol."
        });
    } else {
        checks.push({
            name: "URL structure",
            status: "safe",
            message: "URL structure looks normal."
        });
    }

    // --------------------------------
    // FINAL SCORE
    // --------------------------------

    score = Math.max(0, Math.min(100, score));

    let riskLevel;

    if (score >= 80) {
        riskLevel = "LOW";
    } else if (score >= 50) {
        riskLevel = "MEDIUM";
    } else {
        riskLevel = "HIGH";
    }

    return {
        valid: true,
        url: input,
        domain: hostname,
        protocol: parsedURL.protocol,
        score,
        riskLevel,
        checks
    };
}

module.exports = analyzeURL;