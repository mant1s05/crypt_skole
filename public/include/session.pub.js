const sessionP = document.getElementById("session");
const menu = document.getElementById("menu");

function renderMenu(links) {
    menu.innerHTML = links
        .map((link) => `<a href="${link.href}">${link.label}</a>`)
        .join("");
}

async function checkSession() {
    const res = await fetch("/api/session");
    const data = await res.json();

    if (data.userId && data.userName) {
        sessionP.textContent = `${data.userName} (id: ${data.userId}) er logget inn.`;
        renderMenu([
            { href: "reset.html", label: "Reset password" },
            { href: "logout.html", label: "Logout" }
        ]);
    } else {
        sessionP.textContent = "Ingen bruker er logget inn.";
        renderMenu([
            { href: "login.html", label: "Login" },
            { href: "register.html", label: "Register" }
        ]);
    }
}

window.checkSession = checkSession;
checkSession();
