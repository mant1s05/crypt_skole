const reg = document.getElementById("register");
const result = document.getElementById("result");

reg.addEventListener("submit", async function (e) {
    e.preventDefault();
    const un = document.getElementById("userName").value;
    const p = document.getElementById("password").value;
    const res = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName: un,
            password: p
        })
    });
    const data = await res.json();

    if (res.ok && data.result) {
        result.textContent = `Bruker ${un} ble opprettet med id ${data.result.lastID}.`;
        reg.reset();
        return;
    }

    result.textContent = data.message || "Registrering feilet.";
});
