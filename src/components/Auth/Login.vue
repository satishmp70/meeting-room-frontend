<template>
  <div class="auth-bg">
    <el-card class="auth-card glass-card" shadow="hover">
      <div class="auth-logo">
        <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 8px #1976d244);">
          <rect x="6" y="10" width="36" height="28" rx="4" fill="#1976d2"/>
          <rect x="14" y="18" width="20" height="3.5" rx="1.5" fill="#fff"/>
          <rect x="14" y="25" width="12" height="3.5" rx="1.5" fill="#fff"/>
          <rect x="30" y="25" width="4" height="3.5" rx="1.5" fill="#fff"/>
        </svg>
      </div>
      <el-form :model="loginForm" class="auth-form" @submit.prevent="login" label-position="top">
        <el-form-item label="Email">
          <el-input v-model="loginForm.email" type="email" placeholder="Email" clearable autofocus />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="loginForm.password" type="password" placeholder="Password" show-password clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="auth-btn" style="width:100%;" @click="login">Login</el-button>
        </el-form-item>
      </el-form>
      <div class="auth-switch">
        <span>Don't have an account?</span>
        <router-link to="/register">Register</router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '../../api/api';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store';
import { ElMessage } from 'element-plus';

const loginForm = ref({ email: '', password: '' });
const router = useRouter();
const userStore = useUserStore();

const login = async () => {
  try {
    const res = await api.post('/login', { email: loginForm.value.email, password: loginForm.value.password });
    userStore.setToken(res.data.token);
    userStore.setUser(res.data.user);
    router.push('/');
  } catch (err: any) {
    ElMessage.error(err.response?.data?.message || 'Login failed');
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
.auth-bg {
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
.auth-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}
.auth-form {
  margin-top: 8px;
}
.auth-btn {
  font-weight: 600;
  font-size: 1.08rem;
  border-radius: 8px;
  padding: 12px 0;
  letter-spacing: 0.01em;
}
.auth-switch {
  margin-top: 18px;
  text-align: center;
  span {
    margin-right: 6px;
    color: #888;
  }
  a {
    color: #1E88E5;
    text-decoration: underline;
  }
}
</style>