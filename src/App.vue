<script setup lang="ts">
import Navbar from './components/Layout/Navbar.vue';
import { useUserStore } from './store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const userStore = useUserStore();
const { token, user } = storeToRefs(userStore);

onMounted(() => {
  if (token.value && !user.value) {
    userStore.fetchUser();
  }
});
</script>

<template>
  <div>
    <Navbar v-if="token" />
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
