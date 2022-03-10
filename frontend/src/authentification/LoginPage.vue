<template>
  <div class="home">
    <img class="logo" alt="logo" src="../assets/icon-above-font.png">
    <p class="presentation">Pour partagez et restez en contact avec vos collègues,<br>
      n'attendez plus connectez-vous ou inscrivez-vous!</p>
    <form class="login" @submit.prevent="submit()">
      <label for="email">Email:
        <input id="email" name="email" type="email" v-model="email" placeholder="Email Address"/>
      </label><br>
      <label for="password">Password:
        <input id="password" name="password" type="password" v-model="password"
               placeholder="Password"/>
      </label><br>
      <button>Login</button><br>
      <button>Create a new account</button>
    </form>
  </div>

</template>

<script>
import axios from 'axios';

const baseURI = 'http://localhost:3000/api/auth';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    submit() {
      const login = {
        email: this.email,
        password: this.password,
      };

      axios.post(`${baseURI}/login`, login)
        .then((response) => {
          if (response.status === 204) {
            alert('User not found');
          }
          if (response.status === 200) {
            // TODO redirect to home
          }
        })
        .catch((error) => {
          console.log(error);
        });

      // this.$emit('submit', login);
      this.email = '';
      this.password = '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.logo {
  width: 600px;
}

.presentation {
  color: #FC2E00;
  font-size: 30px;
  margin: 0 0 50px 0;
}

label {
  font-size: 20px;
  color: #FC2E00;
}

input {
  margin: 10px;
  padding: 4px;
  min-width: 200px;
}

button{
  margin: 10px;
  padding: 6px;
  color: #FC2E00;
  background-color: #FDD7D7;
  border-radius: 20px;
  min-width: 200px;
  font-size: 14px;
}

</style>
