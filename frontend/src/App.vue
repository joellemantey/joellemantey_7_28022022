<template>
  <nav>
    <router-link :to="{name:'LoginPage'}"></router-link>
<!--    <router-link to="/signup">Signup</router-link>-->
  </nav>
  <router-view/>
<!--  <login-page/>-->
</template>

<script>

export default {
  name: 'App',
};

</script>

<style>
:root {
  --el-color-primary: #FC2E00;
  --el-color-primary-light-1: #ff4117;
  --el-color-primary-light-2: #ff5631;
  --el-color-primary-light-3: #ff6b4a;
  --el-color-primary-light-4: #ff8064;
  --el-color-primary-light-5: #ff967e;
  --el-color-primary-light-6: #ffab98;
  --el-color-primary-light-7: #ffc0b2;
  --el-color-primary-light-8: #ffd5cb;
  --el-color-primary-light-9: #ffeae5;
  --el-color-primary-light-10: #ffffff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
