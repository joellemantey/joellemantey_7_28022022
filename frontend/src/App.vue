<template>
  <main>
    <SignupPage />
<!--    <LoginPage />-->
  </main>
</template>

<script>
import SignupPage from './authentification/SignupPage.vue';
// import LoginPage from './authentification/LoginPage.vue';

export default {
  name: 'App',
  components: {
    // LoginPage,
    SignupPage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

</style>
