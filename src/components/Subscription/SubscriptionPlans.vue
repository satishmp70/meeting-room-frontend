<template>
  <div class="subscription-bg">
    <el-card class="subscription-card glass-card">
      <h2>Subscription Plans</h2>
      <el-row :gutter="20">
        <el-col v-for="plan in plans" :key="plan.id" :span="8">
          <el-card class="plan-card">
            <div class="plan-title">{{ plan.name }}</div>
            <div class="plan-detail">{{ plan.bookings_per_day }} bookings/day</div>
            <el-button type="primary" @click="subscribe(plan.id)">Subscribe</el-button>
          </el-card>
        </el-col>
      </el-row>
      <el-alert v-if="message" :title="message" type="success" show-icon style="margin-top: 16px;" />
      <el-alert v-if="error" :title="error" type="error" show-icon style="margin-top: 16px;" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../../api/api';

const plans = ref<any[]>([]);
const message = ref('');
const error = ref('');

const fetchPlans = async () => {
  try {
    const res = await api.get('/subscription-plans');
    plans.value = res.data;
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load plans';
  }
};

const subscribe = async (plan_id: number) => {
  error.value = '';
  message.value = '';
  try {
    await api.post('/subscribe', { plan_id });
    message.value = 'Subscription updated!';
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Subscription failed';
  }
};

onMounted(fetchPlans);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
.subscription-bg {
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
.subscription-card {
  max-width: 900px;
  margin: 32px auto;
  padding: 24px;
  box-shadow: none;
  border-radius: 18px;
}
.plan-card {
  text-align: center;
  margin-bottom: 16px;
  border-radius: 12px;
}
.plan-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
}
.plan-detail {
  margin-bottom: 16px;
  color: #888;
}
</style>