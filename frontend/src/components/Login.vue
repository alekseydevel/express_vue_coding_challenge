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
import { login, getUsers } from '../store/user.js'; // todo: configure alias

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
    async auth() {
      await login(this.login, this.password).then((res) => {
        this.message = this.getMessageByStatusCode(res.status);
      });
    },
    async getUsersListFromAPI() {
      return getUsers()
        .then((res) => {
          const transform = function (u) {
            u.email = u.login;
            u.pass = u.password;
            return u;
          };

          this.usersList = res.map((u) => transform(u));
        });
    },
    getMessageByStatusCode(code) {
      if (code >= 400 && code < 500) {
        return "Could not login. Please, check your creds";
      }
      if (code >= 500) {
        return "Server issue.";
      }
      if (code >= 200 && code < 300) {
        return "Success";
      }

      return "No idea ;)"
    }
  },
  created() {
    this.getUsersListFromAPI();
  },
};
</script>
