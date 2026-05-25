const form = document.getElementById("reset");
const oldPasswordInput = document.getElementById("oldPassword");
const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const resetButton = document.getElementById("resetButton");
const errorMessage = document.getElementById("errorMessage");
const resultReset = document.getElementById("resultReset");

function validateResetForm() {
    const oldPassword = oldPasswordInput.value.trim();
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

    if (!newPassword && !confirmPassword) {
        errorMessage.textContent = "";
    } else if (passwordsMatch) {
        errorMessage.style.color = "green";
        errorMessage.textContent = "V";
    } else {
        errorMessage.style.color = "red";
        errorMessage.textContent = "X";
    }

    resetButton.disabled = !(oldPassword && passwordsMatch);
    return !resetButton.disabled;
}

oldPasswordInput.addEventListener("input", validateResetForm);
newPasswordInput.addEventListener("input", validateResetForm);
confirmPasswordInput.addEventListener("input", validateResetForm);

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!validateResetForm()) {
        resultReset.innerHTML = "<span style=\"color: #b42318;\">Fyll ut gammelt passord og pass pa at de nye passordene matcher.</span>";
        return;
    }

    try {
        const res = await fetch("/api/reset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                oldPassword: oldPasswordInput.value,
                password: newPasswordInput.value,
                confirmPassword: confirmPasswordInput.value
            })
        });
        const data = await res.json();
        console.log("Reset response:", data);

        if (!res.ok || data.status !== "success") {
            resultReset.innerHTML = `<span style="color: #b42318;">${data.message || "Passordet ble ikke oppdatert."}</span>`;
            return;
        }

        resultReset.innerHTML = "<span style=\"color: #166534;\">Passordet ble oppdatert. Du kan fortsette a bruke denne sessionen.</span>";
        form.reset();
        errorMessage.textContent = "";
        resetButton.disabled = true;

        if (typeof window.checkSession === "function") {
            window.checkSession();
        }
    } catch (error) {
        console.error("Reset request failed:", error);
        resultReset.innerHTML = "<span style=\"color: #b42318;\">Noe gikk galt under passordbyttet.</span>";
    }
});
