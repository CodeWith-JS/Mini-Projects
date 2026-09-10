javascript
/* ========================================
   MOUSE FOLLOW GLOW
======================================== */

const mouseGlow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (e) => {

    mouseGlow.style.left = `${e.clientX}px`;
    mouseGlow.style.top = `${e.clientY}px`;

});


/* ========================================
   PASSWORD SHOW / HIDE
======================================== */

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.textContent = "◉";

    } else {

        password.type = "password";

        togglePassword.textContent = "◉";

    }

});


/* ========================================
   PASSWORD STRENGTH
======================================== */

const strengthBars =
    document.querySelectorAll(".strength-bars span");

const strengthText =
    document.getElementById("strengthText");


password.addEventListener("input", () => {

    const value = password.value;

    let strength = 0;


    if (value.length >= 6) {
        strength++;
    }

    if (value.length >= 10) {
        strength++;
    }

    if (/[A-Z]/.test(value)) {
        strength++;
    }

    if (/[0-9]/.test(value)) {
        strength++;
    }


    strengthBars.forEach((bar, index) => {

        bar.style.background =
            index < strength
                ? "linear-gradient(90deg,#8b5cf6,#06b6d4)"
                : "#27272f";

    });


    if (!value) {

        strengthText.textContent =
            "Enter password";

    } else if (strength <= 1) {

        strengthText.textContent =
            "Weak";

    } else if (strength === 2) {

        strengthText.textContent =
            "Medium";

    } else if (strength === 3) {

        strengthText.textContent =
            "Strong";

    } else {

        strengthText.textContent =
            "Excellent";

    }

});


/* ========================================
   LOGIN FORM
======================================== */

const form = document.getElementById("loginForm");

const loginBtn =
    document.getElementById("loginBtn");

const btnText =
    loginBtn.querySelector(".btn-text");

const arrow =
    loginBtn.querySelector(".arrow");


form.addEventListener("submit", (e) => {

    e.preventDefault();


    const email =
        document.getElementById("email").value;

    const passwordValue =
        password.value;


    if (!email || !passwordValue) {

        return;

    }


    /* Loading animation */

    btnText.textContent = "Authenticating...";
    arrow.textContent = "⋯";

    loginBtn.disabled = true;


    setTimeout(() => {

        btnText.textContent = "Welcome back!";
        arrow.textContent = "✓";


        loginBtn.style.background =
            "linear-gradient(100deg,#059669,#10b981)";


        setTimeout(() => {

            /*
                Replace this with your backend API call.

                Example:

                fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password: passwordValue
                    })
                });
            */

            console.log("Login:", {
                email: email,
                password: passwordValue
            });


        }, 700);


    }, 1200);

});


/* ========================================
   INPUT FOCUS ANIMATION
======================================== */

const inputs =
    document.querySelectorAll(".input-wrapper input");


inputs.forEach(input => {

    input.addEventListener("focus", () => {

        input.parentElement
            .querySelector(".input-icon")
            .style.color = "#a78bfa";

    });


    input.addEventListener("blur", () => {

        input.parentElement
            .querySelector(".input-icon")
            .style.color = "#777784";

    });

});

