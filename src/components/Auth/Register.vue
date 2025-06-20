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
      <el-form :model="registerForm" class="auth-form" @submit.prevent="register" label-position="top">
        <el-form-item label="Name">
          <el-input v-model="registerForm.name" placeholder="Name" clearable autofocus />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="registerForm.email" type="email" placeholder="Email" clearable />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="registerForm.password" type="password" placeholder="Password" show-password clearable />
        </el-form-item>
        <el-form-item label="Confirm Password">
          <el-input v-model="registerForm.password_confirmation" type="password" placeholder="Confirm Password" show-password clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="auth-btn" style="width:100%;" @click="register">Register</el-button>
        </el-form-item>
      </el-form>
      <div class="auth-switch">
        <span>Already have an account?</span>
        <router-link to="/login">Login</router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '../../api/api';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const registerForm = ref({ name: '', email: '', password: '', password_confirmation: '' });
const router = useRouter();

const register = async () => {
  try {
    await api.post('/register', {
      name: registerForm.value.name,
      email: registerForm.value.email,
      password: registerForm.value.password,
      password_confirmation: registerForm.value.password_confirmation,
    });
    router.push('/login');
  } catch (err: any) {
    ElMessage.error(err.response?.data?.message || 'Registration failed');
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