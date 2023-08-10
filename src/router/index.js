import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";


const routes = [
  { path: '/', component: LoginPage,name: 'login' },
  { path: '/register', component: RegisterPage,name: 'register' },
  // Tambahkan rute-rute lain di sini
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
