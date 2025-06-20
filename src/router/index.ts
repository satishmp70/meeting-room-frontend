import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';
import Dashboard from '../components/Layout/Dashboard.vue';
import BookingList from '../components/Booking/BookingList.vue';
import BookingForm from '../components/Booking/BookingForm.vue';
import BookingEdit from '../components/Booking/BookingEdit.vue';
import SubscriptionPlans from '../components/Subscription/SubscriptionPlans.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/bookings', component: BookingList, meta: { requiresAuth: true } },
  { path: '/bookings/new', component: BookingForm, meta: { requiresAuth: true } },
  { path: '/bookings/:id/edit', component: BookingEdit, meta: { requiresAuth: true } },
  { path: '/subscriptions', component: SubscriptionPlans, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;