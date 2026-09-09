const scanButton = document.getElementById("scanButton");
const urlInput = document.getElementById("urlInput");

const scanResult = document.getElementById("scanResult");
const scoreValue = document.getElementById("scoreValue");
const riskBadge = document.getElementById("riskBadge");
const resultURL = document.getElementById("resultURL");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const checksList = document.getElementById("checksList");


/* ==============================
   EVENTS
================================= */

scanButton.addEventListener("click", scanURL);

urlInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        scanURL();
    }

});


/* ==============================
   SCAN URL
================================= */

async function scanURL() {

    const url = urlInput.value.trim();

    if (!url) {
        alert("Please enter a URL.");
        return;
    }


    // Hide previous result

    scanResult.classList.add("hidden");


    // Loading state

    scanButton.disabled = true;
    scanButton.innerHTML = "Scanning...";


    try {

        const response = await fetch(
            "http://localhost:5000/api/scan",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    url: url
                })
            }
        );


        const data = await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message || "Scan failed."
            );

        }


        displayResult(data.result);


    } catch (error) {

        console.error("Scan error:", error);

        alert(
            "Unable to connect to LinkShield server."
        );

    } finally {

        scanButton.disabled = false;

        scanButton.innerHTML =
            'Scan URL <span>→</span>';

    }

}


/* ==============================
   DISPLAY RESULT
================================= */

function displayResult(result) {

    scanResult.classList.remove("hidden");


    // Score

    scoreValue.textContent = result.score;


    // URL

    resultURL.textContent = result.url;


    // Risk

    riskBadge.textContent =
        `${result.riskLevel} RISK`;


    // Result message

    if (result.score >= 80) {

        resultTitle.textContent =
            "Low risk detected";

        resultMessage.textContent =
            "The URL passed most of our security checks.";

    } else if (result.score >= 50) {

        resultTitle.textContent =
            "Some concerns detected";

        resultMessage.textContent =
            "This URL contains patterns that deserve attention.";

    } else {

        resultTitle.textContent =
            "High risk detected";

        resultMessage.textContent =
            "This URL contains multiple potentially suspicious patterns.";

    }


    // Checks

    checksList.innerHTML = "";


    result.checks.forEach((check) => {

        const item = document.createElement("div");

        item.className = "check-item";


        let icon = "✓";

        if (check.status === "warning") {
            icon = "!";
        }

        if (check.status === "danger") {
            icon = "×";
        }


        item.innerHTML = `
            <div class="check-icon check-${check.status}">
                ${icon}
            </div>

            <div class="check-content">
                <strong>${escapeHTML(check.name)}</strong>

                <span>
                    ${escapeHTML(check.message)}
                </span>
            </div>
        `;


        checksList.appendChild(item);

    });


    // Scroll to result

    setTimeout(() => {

        scanResult.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }, 100);

}


/* ==============================
   HTML ESCAPE
================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}