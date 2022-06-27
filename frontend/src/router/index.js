import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../authentification/LoginPage.vue';
// eslint-disable-next-line import/extensions
import SignupPage from '../authentification/SignupPage';
import PageAccueil from '../Pages/PageAccueil.vue';
import PageProfil from '../Pages/PageProfil.vue';
// eslint-disable-next-line import/extensions
// import ModifyPost from '../Posts/ModifyPost';

export default createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    name: 'LoginPage',
    components: {
      default: LoginPage,
    },
  }, {
    path: '/signup',
    name: 'SignupPage',
    components: {
      default: SignupPage,
    },
  }, {
    path: '/accueil',
    name: 'PageAccueil',
    components: {
      default: PageAccueil,
    },
  }, {
    path: '/Profil',
    name: 'PageProfil',
    components: {
      default: PageProfil,
    },
  // }, {
  //   path: '/modify/:id',
  //   name: 'ModifyPost',
  //   components: {
  //     default: ModifyPost,
  //   },
  },
  ],
});
