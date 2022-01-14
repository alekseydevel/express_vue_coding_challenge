function login(login, pass) {
    return fetch("http://localhost:9999/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: login, password: pass }),
      });
}

function getUsers() {
    return fetch("http://localhost:9999/users", {
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
}

module.exports = { login, getUsers };