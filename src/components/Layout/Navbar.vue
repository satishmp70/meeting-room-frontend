<template>
  <el-menu mode="horizontal" :default-active="$route.path" class="navbar glass-navbar" background-color="rgba(45,58,75,0.85)" text-color="#fff" active-text-color="#409EFF">
    <div class="navbar-left">
      <span class="navbar-title" style="filter: drop-shadow(0 2px 8px #1976d244);">Meeting Room Booking</span>
    </div>
    <el-menu-item index="/">
      <router-link to="/">Dashboard</router-link>
    </el-menu-item>
    <el-menu-item index="/bookings">
      <router-link to="/bookings">Bookings</router-link>
    </el-menu-item>
    <el-menu-item index="/bookings/new">
      <router-link to="/bookings/new">Book Room</router-link>
    </el-menu-item>
    <el-menu-item index="/subscriptions">
      <router-link to="/subscriptions">Subscriptions</router-link>
    </el-menu-item>
    <div class="navbar-right" v-if="userStore.token">
      <el-button type="primary" @click="logout" size="small">Logout</el-button>
    </div>
  </el-menu>
</template>

<script setup lang="ts">
import { useUserStore } from '../../store';
import { useRouter, useRoute } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const logout = async () => {
  try {
    await import('../../api/api').then(api => api.default.post('/logout'));
  } catch {}
  userStore.logout();
  router.push('/login');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  min-height: 60px;
  font-family: 'Inter', sans-serif;
  border-radius: 0 0 18px 18px;
}
.glass-navbar {
  background: rgba(45,58,75,0.85) !important;
  box-shadow: 0 8px 32px 0 rgba(30,136,229,0.10);
  backdrop-filter: blur(8px);
}
.navbar-left {
  display: flex;
  align-items: center;
  margin-right: 32px;
}
.navbar-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-right: 32px;
  letter-spacing: 0.01em;
}
.navbar-right {
  margin-left: auto;
  display: flex;
  align-items: center;
}
.el-menu-item a {
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  font-size: 1.08rem;
}
</style>