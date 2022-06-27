<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      @close="$emit('close')"
      :before-close="handleClose"
    >
      <el-form class="contenu" @submit.prevent="submit()"
               style="max-width: 360px" v-for="post in posts" :key="post.id">
        <el-form-item for=modif_contenu>Post:
          <el-input id="modif_contenu"
                    name="modif_contenu"
                    type="modif_contenu"
                    v-model="modif_contenu"
                    placeholder="please enter your content">
<!--            {{post.contenu}}-->
          </el-input>
        </el-form-item>
        <el-upload
          :headers="headers"
          class="upload-demo"
          drag
          action="http://localhost:3000/posts/images"
          name="image"
          :auto-upload="false"
          :on-change="recup_images"
        >
          <el-icon class="el-icon--upload">
            <upload-filled/>
          </el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('close')">Cancel</el-button>
        <el-button type="primary" @click="submit()" @close="$emit('close')"
        >Confirm</el-button>
      </span>
      </template>
    </el-dialog>
    {{id}}
  </div>
</template>

<script>

import {
  ElMessageBox,
  ElButton,
  ElDialog,
  ElForm,
  ElUpload,
  ElFormItem,
  ElInput,
} from 'element-plus';

import { UploadFilled } from '@element-plus/icons-vue';

import axios/* , { getToken } */ from '../axios';

// eslint-disable-next-line no-unused-vars
function handleClose(done) {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
}

const baseURI = 'http://localhost:3000';

export default {
  name: 'ModifyPost',
  // props: {
  //   isOpen: Boolean,
  // },
  // computed: {
  //   dialogVisible() {
  //     return this.isOpen;
  //   },
  // },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ElButton,
    ElDialog,
    ElForm,
    UploadFilled,
    ElUpload,
    ElFormItem,
    ElInput,
    // eslint-disable-next-line vue/no-unused-components
    // DiscordPicker,
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      id: Number(this.$route.params.id),
      posts: [],
      nom: '',
      prenom: '',
      contenu: '',
      contenu_multimedias: '',
    };
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    recette() {
      return this.posts.find((post) => post.id === this.id);
    },
  },
  created() {
    axios.get(`${baseURI}`)
      .then((response) => {
        this.posts = response.data.data;
      });
  },
  //
  // methods: {
  //   submit() {
  //     const put = new FormData();
  //     put.update('image', this.contenu_multimedias);
  //     put.update('contenu', this.contenu);
  //
  //     axios.put('posts', put, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           this.close();
  //           this.$router.push({ name: 'PageAccueil' });
  //         } else {
  //           alert('Erreur account');
  //         }
  //         this.$emit('close');
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         this.$emit('close');
  //       });
  //   },
  //   recup_images(file, fileList) {
  //     console.log('recup', file, fileList);
  //     this.contenu_multimedias = file.raw;
  //   },
  // },
  // data() {
  //   return {
  //     // dialogVisible: ref(false),
  //     posts: [],
  //     nom: '',
  //     prenom: '',
  //     contenu: '',
  //     contenu_multimedias: '',
  //     headers: {
  //       Authorization: getToken(),
  //     },
  //   };
  // },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 480px;
  margin: 30px;
}
</style>
