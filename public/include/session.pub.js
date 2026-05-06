const sessionP = document.getElementById("session");

async function checkSession() {
  const res = await fetch("/api/session");
  const data = await res.json();

  if (data.userId && data.userName) {
    sessionP.innerHTML += `<br />${data.userName} (id: ${data.userId}) logged in`;
    sessionP.innerHTML += `<br /> <a href="reset.html">Reset password</a>`;
    sessionP.innerHTML += ` -- <a href="logout.html">Logout</a>`;
  } else {
    sessionP.innerHTML += "";
  }
}

checkSession();