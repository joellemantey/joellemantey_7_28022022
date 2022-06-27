<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      @close="$emit('close')"
      :before-close="handleClose"
    >{{ post }}<br>{{ newPost }}
      <el-form class="contenu" @submit.prevent="submit()" :model="newPost"
               style="max-width: 360px">
        <!--        <discord-picker-->
        <!--          input-->
        <!--          :value="contenu"-->
        <!--          gif-format="md"-->
        <!--          @update:value="contenu = $event"-->
        <!--          @emoji="setEmoji"-->
        <!--          @gif="setGif"-->
        <!--        />-->
        <el-form-item for=contenu>Post:
          <el-input id="contenu" name="contenu" type="textarea"
                    v-model="newPost.contenu"
                    placeholder="please enter your content">
          </el-input>
        </el-form-item>
        <el-upload
          id="contenu_multimedias"
          :headers="headers"
          class="upload-demo"
          action="http://localhost:3000/posts/images"
          name="image"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :file-list="fileList"
          :auto-upload="false"
          :on-change="recup_images"
          v-model="newPost.contenu_multimedias"
        >
          <el-icon class="el-icon--upload">
            <upload-filled/>
          </el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <!--          <template #tip>-->
          <!--            <div class="el-upload__tip">-->
          <!--              jpg/png files with a size less than 500kb-->
          <!--            </div>-->
          <!--          </template>-->
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
  </div>
</template>

<script>

// import DiscordPicker from 'vue3-discordpicker';

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

import axios, { getToken } from '../axios';

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

// eslint-disable-next-line no-unused-vars
const handlePictureCardPreview = (uploadFile) => {
  // eslint-disable-next-line no-undef
  contenu_multimedias.value = uploadFile.url;
  // !dialogVisible.value = true
};

// const baseURI = 'http://localhost:3000';

export default {
  name: 'DialogPost',
  props: {
    isCreation: Boolean,
    isOpen: Boolean,
    post: Object,
  },
  emits: ['update:post'],
  data() {
    return {
      posts: [],
      nom: '',
      prenom: '',
      // contenu: this.post.contenu,
      // newPost: { ...this.post },
      newPost: this.post,
      headers: {
        Authorization: getToken(),
      },
      // contenu: this.post.contenu,
    };
  },
  /* modification sur la même fenêtre que la création */
  watch: {
    post: {
      handler(newValue) {
        this.newPost = { ...newValue };
        // console.log('watch', newValue, oldValue);
      },
      deep: true,
    },
  },
  computed: {
    dialogVisible() {
      return this.isOpen;
    },
    postCreation() {
      return this.isCreation;
    },
  },
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

  methods: {
    submit() {
      if (this.postCreation) {
        const post = new FormData();
        post.append('image', this.newPost.contenu_multimedias);
        post.append('contenu', this.newPost.contenu);
        window.location.reload();

        axios.post('posts', post, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            if (response.status === 200) {
              this.$emit('update:post', this.newPost);
              this.$router.push({ name: 'PageAccueil' });
            } else {
              alert('Erreur account');
            }
            this.$emit('close');
          })
          .catch((error) => {
            console.log(error);
            this.$emit('close');
          });
      } else {
        const modifPost = new FormData();
        modifPost.append('image', this.newPost.contenu_multimedias);
        modifPost.append('contenu', this.newPost.contenu);

        axios.put(`posts/${this.newPost.id}`, modifPost, {
          contenu: this.newPost.contenu,
          contenu_multimedias: this.newPost.contenu_multimedias,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            if (response.status === 200) {
              this.newPost = {
                ...this.newPost,
                ...response.data.data,
              };
              this.$emit('update:post', this.newPost);
              // this.close();
              // this.$router.push({ name: 'PageAccueil' });
            } else {
              alert('Erreur account');
            }
            this.$emit('close');
            this.$router({ name: 'PageAccueil' });
          })
          .catch((error) => {
            console.log(error);
            this.$emit('close');
          });
      }
    },
    recup_images(file, fileList) {
      console.log('recup', file, fileList);
      this.newPost.contenu_multimedias = file.raw;
    },
  },
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
