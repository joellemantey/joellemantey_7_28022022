<template>
  <div class="home">
    <img class="logo" alt="logo" src="../assets/icon-above-font.png">
    <p class="presentation">Merci de saisir quelques informations<br>
      afin de faire plus ample connaissance. </p>
    <el-form class="login" @submit.prevent="submit()" label-width="460px" style="max-width: 960px">
      <el-form-item for="email">Email:
        <el-input id="email" name="email" type="email" v-model="email" placeholder="Email Address">
        </el-input>
      </el-form-item>
      <el-form-item for="password">Password:
        <el-input id="password" name="password" type="password" v-model="password"
                  placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item for="nom">Name:
        <el-input id="nom" name="nom" type="text" v-model="nom"
                  placeholder="Your Name"></el-input>
      </el-form-item>
      <el-form-item for="prenom">First name:
        <el-input id=prenom name="prenom" type="text" v-model="prenom"
                  placeholder="Your First name"></el-input>
      </el-form-item>
      <el-form-item for="job">Job:
        <el-input id="job" name="job" type="text" v-model="job"
                  placeholder="Your job"></el-input>
      </el-form-item>
      <el-form-item for="departement">Departement:
        <el-input id="departement" name="departement" type="text" v-model="departement"
                  placeholder="Your departement"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()" round>Create</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import axios from 'axios';
import {
  ElButton, ElForm, ElFormItem, ElInput,
} from 'element-plus';

const baseURI = 'http://localhost:3000/api/auth';

export default {
  name: 'SignupPage',
  components: {
    ElButton, ElForm, ElFormItem, ElInput,
  },
  data() {
    return {
      email: '',
      password: '',
      nom: '',
      prenom: '',
      job: '',
      departement: '',
    };
  },
  methods: {
    submit() {
      const signup = {
        email: this.email,
        password: this.password,
        nom: this.nom,
        prenom: this.prenom,
        job: this.job,
        departement: this.departement,
      };

      axios.post(`${baseURI}/signup`, signup)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ name: 'PageAccueil' });
          } else {
            alert('Erreur account');
          }
        })
        .catch((error) => {
          console.log(error);
        });
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

</style>
