<template>
  <div class="home">
    <img class="logo" alt="logo" src="../assets/icon-above-font.png">
    <p class="presentation">Merci de saisir quelques informations<br>
      afin de faire plus ample connaissance. </p>
    <form class="login" @submit.prevent="submit()">
      <div class="form">
        <label for="email">Email:
          <input id="email" name="email" type="email" v-model="email" placeholder="Email Address"/>
        </label><br>
        <label for="password">Password:
          <input id="password" name="password" type="password" v-model="password"
                 placeholder="Password"/>
        </label><br>
        <label for="name">Name:
          <input id="name" name="name" type="text" v-model="name"
                 placeholder="Your Name"/>
        </label><br>
        <label for="first-name">First name:
          <input id="first-name" name="first-name" type="text" v-model="firstname"
                 placeholder="Your First name"/>
        </label><br>
        <label for="job">Job:
          <input id="job" name="job" type="text" v-model="job"
                 placeholder="Your job"/>
        </label><br>
        <label for="departement">Departement:
          <input id="departement" name="departement" type="text" v-model="departement"
                 placeholder="Your departement"/>
        </label><br>
      </div>
      <button>Create</button>
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

.form {
width: 370px;
  text-align: end;
  margin: 0 auto 30px;
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

button {
  margin: 10px;
  padding: 6px;
  color: #FC2E00;
  background-color: #FDD7D7;
  border-radius: 20px;
  min-width: 200px;
  font-size: 14px;
}

</style>
