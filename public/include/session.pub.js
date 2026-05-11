const sessionP = document.getElementById("session");
const menu = document.getElementById("menu");

function getCurrentPage() {
    const page = window.location.pathname.split("/").pop();
    return page || "index.html";
}

function createLink(href, label) {
    return `<a href="${href}">${label}</a>`;
}

function renderMenu(isLoggedIn) {
    const currentPage = getCurrentPage();
    const links = [];

    if (currentPage !== "index.html") {
        links.push(createLink("index.html", "Forside"));
    }

    if (!isLoggedIn && currentPage !== "register.html") {
        links.push(createLink("register.html", "Register"));
    }

    if (!isLoggedIn && currentPage !== "login.html") {
        links.push(createLink("login.html", "Login"));
    }

    menu.innerHTML = links.join(" | ");
}

async function checkSession() {
    const res = await fetch("/api/session");
    const data = await res.json();

    if (data.userId && data.userName) {
        sessionP.textContent = `${data.userName} (id: ${data.userId}) logged in`;
        renderMenu(true);
        return;
    }

    sessionP.textContent = "";
    renderMenu(false);
}

window.checkSession = checkSession;
checkSession();
