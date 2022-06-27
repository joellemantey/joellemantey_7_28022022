<template>
  <div class="home">
    <img class="logo" alt="logo" src="../assets/icon-above-font.png">
    <p class="presentation">Pour partagez et restez en contact avec vos collègues,<br>
      n'attendez plus connectez-vous ou inscrivez-vous!</p>
    <el-form class="login" @submit.prevent label-width="460px" style="max-width: 960px">
      <el-form-item for="email">Email:
        <el-input id="email" name="email" type="email" v-model="email" placeholder="Email Address">
        </el-input>
      </el-form-item>
      <el-form-item for="password">Password:
        <el-input id="password" name="password" type="password" v-model="password"
                  placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()" round>Login</el-button>
        <router-link to="/signup">
          <el-button type="primary" round>Create a new account</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {
  ElButton, ElForm, ElFormItem, ElInput,
} from 'element-plus';

import axios from '../axios';

const baseURI = 'http://localhost:3000/api/auth';

export default {
  name: 'LoginPage',
  components: {
    ElButton, ElForm, ElFormItem, ElInput,
  },

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
            localStorage.setItem('token', `${response.data.token}`);
            // localStorage.setItem('id', `${response.data.userId}`);
            // axios.defaults.headers.common.Authorization = localStorage.getItem('token');
            this.$router.push({ name: 'PageAccueil' });
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
  margin: auto;
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
