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
      <el-main>
        <el-button type="primary" @click="dialogVisible = true;postCreation= true;
        selectedPost = {}" circle>
          <el-icon>
            <document-add/>
          </el-icon>
        </el-button>
        <DialogPost :is-open="dialogVisible"
                    :is-creation="postCreation"
                    v-model:post="selectedPost"
                    @close="() => dialogVisible = false"
                    @update:post="updatePost"/>
        {{ selectedPost }}
        <el-card class="box-card" v-for="post in posts" :key="post.id">
          <template #header>
            <div class="card-header">
              <span>{{ post.nom }} {{ post.prenom }}</span>
            </div>
          </template>
          <div>{{ post.contenu }} <br>
            <img class="imgPost" :src="post.contenu_multimedias" alt=""/>
          </div>
          <el-button v-if="hasAccess(post.user_id)" class="button" type="text"
                     @click="deletePost(post.id)">
            Delete a post
          </el-button>
          <el-button type="primary"
                     @click="dialogVisible = true;selectedPost = post;postCreation= false"
                     v-if="hasAccess(post.user_id)"
                     class="button">Modify a post
          </el-button>
        </el-card>
      </el-main>
      <el-footer>
        <el-button type="primary" style="width: 200px" @click="deleteUser">
          <el-icon>
            <Delete/>
          </el-icon>
          Delete a account
        </el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

import { reactive, ref } from 'vue';

import {
  ElContainer, ElHeader, ElButton, ElFooter, ElMain, ElIcon, ElCard,
} from 'element-plus';
// eslint-disable-next-line import/no-extraneous-dependencies

import {
  DocumentAdd, House, Avatar, Delete,
} from '@element-plus/icons-vue';

import axios, { getToken } from '../axios';
import { hasAccess, connectedUser } from '../authentification/hasAcces';

import DialogPost from '../Posts/DialogPost.vue';
// import ModifyPost from '../Posts/ModifyPost.vue';

const baseURI = 'http://localhost:3000';

export default {
  name: 'PageAccueil',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ElContainer,
    ElHeader,
    ElButton,
    ElFooter,
    ElMain,
    ElIcon,
    Delete,
    ElCard,
    DialogPost,
    DocumentAdd,
    Avatar,
    House,
  },
  data() {
    return {
      dialogVisible: ref(false),
      postCreation: ref(false),
      selectedPost: reactive({}),
      posts: reactive([]),
      nom: '',
      prenom: '',
      contenu: '',
      contenu_multimedias: '',
      id: '',
      headers: {
        Authorization: getToken(),
      },
    };
  },

  mounted() {
    axios.get(`${baseURI}/posts`)
      .then((response) => {
        this.posts = response.data.data.reverse();
      });
  },
  methods: {
    hasAccess,
    deletePost(id) {
      axios.delete(`${baseURI}/${id}`)
        // todo supprimer visuellement le post
        .then((response, post, posts) => {
          if (response.status === 200) {
            const postDelete = this.posts.find((p) => p.id === post.id);
            const index = posts.findIndex(postDelete);
            posts.splice(index, 1);
            console.log(posts);
          } else {
            alert('Erreur account');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updatePost(post) {
      const exists = this.posts.find((p) => p.id === post.id);
      if (exists) {
        exists.contenu = post.contenu;
        exists.contenu_multimedias = post.contenu_multimedias;
        // exists = { ...post };
        console.log('after validate', exists, post);
      }
    },

    deleteUser() {
      // eslint-disable-next-line no-undef
      axios.delete(`${baseURI}/users/${this.idUserConnected()}`)
        // todo supprimer visuellement le post
        // eslint-disable-next-line consistent-return
        .catch((error) => {
          console.error(error);
        });
    },
    idUserConnected() {
      const idUser = connectedUser();
      return idUser;
    },
  },
};

</script>

<style scoped>

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

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.imgPost {
  object-fit: cover;
  width: auto;
  height: 200px;
}

.box-card {
  width: 600px;
  height: 350px;
  margin: 30px;
  overflow: hidden;
}
</style>
