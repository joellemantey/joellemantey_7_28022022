<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <img class="logo" alt="logo" src="../assets/icon-left-font.png">
        <router-link :to="{name:'PageAccueil'}">
          <el-icon class="home">
            <House/>
          </el-icon>
        </router-link>
        <router-link :to="{name:'PageProfil'}">
          <el-icon class="profil">
            <Avatar/>
          </el-icon>
        </router-link>
      </el-header>
    </el-container>
  </div>
  <div>
    <p>Votre nom : {{this.infoUser.nom}}</p>
    <p>Votre prénom : {{this.infoUser.prenom}}</p>
    <p>Votre email : {{this.infoUser.email}}</p>
    <p>Votre job : {{this.infoUser.job}}</p>
    <p>Votre département : {{this.infoUser.departement}}</p>
  </div>
</template>

<script>
import {
  ElContainer, ElHeader, ElIcon,
} from 'element-plus';
// eslint-disable-next-line import/no-extraneous-dependencies

import {
  House, Avatar,
} from '@element-plus/icons-vue';

import axios from '../axios';
import { connectedUser } from '../authentification/hasAcces';

const baseURI = 'http://localhost:3000/users';

export default {
  name: 'PageProfil',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ElContainer,
    ElHeader,
    ElIcon,
    Avatar,
    House,
  },
  data() {
    return {
      infoUser: [],
      nom: '',
      prenom: '',
      email: '',
      job: '',
      departement: '',
    };
  },

  mounted() { // GET /users/<userId> => remplacer <userId> par connectedUser
    // eslint-disable-next-line no-undef
    axios.get(`${baseURI}/${this.idUserConnected()}`)
      .then((response) => {
        this.infoUser = response.data.data;
        console.log(this.infoUser);
      });
  },
  methods: {
    idUserConnected() {
      const idUser = connectedUser();
      return idUser;
    },
  },
};
</script>

<style>
.logo {
  width: 400px;
  margin: -200px auto;
}

.header {
  display: flex;
  justify-items: flex-end;
  margin-right: 20px;
  font-size: 30px;
  color: #FC2E00
}

.profil {
  margin-left: 15px;
}
</style>
