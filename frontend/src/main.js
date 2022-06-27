import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import router from './router';

createApp(App)
  .use(ElementPlus)
  .use(router)
  .mount('#app');
