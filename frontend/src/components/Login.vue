<template>
  <div class="hello">
    <ul>
      <li :key="u.email" v-for="u in usersList">{{ u.email }} {{ u.pass }}</li>
    </ul>
    <p>Login status: {{ this.message }}</p>
    <input v-model="login" placeholder="login" />
    <input v-model="password" />
    <button @click.stop.prevent="auth()">login</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      message: "To be logged in",
      login: "",
      password: "",
      usersList: [],
    };
  },
  methods: {
    auth() {
      fetch("http://localhost:9999/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: this.login, password: this.password }),
      })
        .then((res) => {
          if (res.status >= 400 && res.status < 500) {
            this.message = "Could not login. Please, check your creds";
          }
          if (res.status >= 500) {
            this.message = "Server issue.";
          }
          if (res.status >= 200 && res.status < 300) {
            this.message = "Success";
          }
        });
    },
    async getUsersListFromAPI() {
      return fetch("http://localhost:9999/users", {
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => {
          const transform = function (u) {
            u.email = u.login;
            u.pass = u.password;
            return u;
          };

          this.usersList = res.map((u) => transform(u));
        });
    },
  },
  created() {
    this.getUsersListFromAPI();
  },
};
</script>
