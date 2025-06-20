<template>
  <div class="dashboard-bg">
    <el-card class="dashboard-card glass-card" shadow="hover">
      <h2>Welcome, {{ user?.name }}</h2>
      <el-descriptions title="User Info" :column="1" border>
        <el-descriptions-item label="Email">{{ user?.email }}</el-descriptions-item>
        <el-descriptions-item label="Plan">{{ user?.plan_id }}</el-descriptions-item>
        <el-descriptions-item label="Bookings Left Today" v-if="leftToday !== null">{{ leftToday }}</el-descriptions-item>
        <el-descriptions-item label="Max Bookings Per Day" v-if="maxPerDay !== null">{{ maxPerDay }}</el-descriptions-item>
        <el-descriptions-item label="Used Today" v-if="usedToday !== null">{{ usedToday }}</el-descriptions-item>
      </el-descriptions>
      <div class="dashboard-actions">
        <el-button type="primary" @click="$router.push('/bookings/new')">Book a Room</el-button>
        <el-button @click="$router.push('/bookings')">My Bookings</el-button>
        <el-button @click="$router.push('/subscriptions')">Subscription Plans</el-button>
        <el-button v-if="userStore.token" type="danger" @click="logout">Logout</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref as vueRef } from 'vue';
import eventBus from '../../eventBus';
import api from '../../api/api';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const router = useRouter();

const leftToday = vueRef(null);
const maxPerDay = vueRef(null);
const usedToday = vueRef(null);

const fetchDashboardData = async () => {
  try {
    const res = await api.get('/bookings/left-today');
    leftToday.value = res.data.left_today;
    maxPerDay.value = res.data.max_per_day;
    usedToday.value = res.data.used_today;
  } catch {
    leftToday.value = null;
    maxPerDay.value = null;
    usedToday.value = null;
  }
};

onMounted(() => {
  fetchDashboardData();
  eventBus.on('refresh-dashboard', fetchDashboardData);
});

onUnmounted(() => {
  eventBus.off('refresh-dashboard', fetchDashboardData);
});

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
.dashboard-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
}
.glass-card {
  background: rgba(255,255,255,0.75) !important;
  box-shadow: 0 8px 32px 0 rgba(30,136,229,0.18);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  border: 1.5px solid rgba(30,136,229,0.10);
}
.dashboard-card {
  max-width: 500px;
  width: 100%;
  padding: 32px 24px;
  box-shadow: none;
  border-radius: 18px;
}
.dashboard-actions {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
</style>