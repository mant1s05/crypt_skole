const logoutMessage = document.getElementById("logoutMessage");

async function logOutUser() {
    try {
        const res = await fetch("/api/logout", {
            method: "POST"
        });
        const data = await res.json();

        if (!res.ok || data.status !== "success") {
            throw new Error(data.message || "Logout feilet.");
        }

        logoutMessage.textContent = `${data.message} Sender deg til index.html ...`;
        window.setTimeout(() => {
            window.location.replace("index.html");
        }, 800);
    } catch (error) {
        logoutMessage.textContent = error.message;
    }
}

logOutUser();
