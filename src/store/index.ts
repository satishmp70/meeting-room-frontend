import { defineStore } from 'pinia';
import api from '../api/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | Record<string, any>,
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    setUser(user: any) {
      this.user = user;
    },
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    logout() {
      this.user = null;
      this.token = '';
      localStorage.removeItem('token');
    },
    async fetchUser() {
      if (!this.token) return;
      try {
        const res = await api.get('/user');
        this.user = res.data;
      } catch {
        this.user = null;
      }
    },
  },
});