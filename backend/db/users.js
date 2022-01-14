const users = [
  {
    login: "user",
    password: "pass",
  },
  {
    login: "jack",
    password: "black",
  },
];

function getUserLoginAndPassword(login, pass) {
  return users.find((u) => u.login === login && u.password === pass);
}

function getAll() {
  return users;
}

module.exports = { getUserLoginAndPassword, getAll };
