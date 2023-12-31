import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import ProductPage from "@/pages/products/ProductPage.vue";
import ProductCreatePage from "@/pages/products/ProductCreatePage.vue";
import ProductEditPage from "@/pages/products/ProductEditPage.vue";
import ExploreProductPage from "@/pages/products/ExploreProductPage.vue";
import OrderListPage from "@/pages/Order/OrderListPage.vue";
import ExportManagerPage from "@/pages/ExportManager/ExportManagerPage.vue";


const routes = [
  { path: '/', component: LoginPage,name: 'login' },
  { path: '/login', component: LoginPage,name: 'loginn' },
  { path: '/register', component: RegisterPage,name: 'register' },
  { path: '/dashboard', component: DashboardPage,name: 'dashboard', meta: {requiresAuth:true}},
  { path: '/product', component: ProductPage,name: 'product', meta: {requiresAuth:true}},
  { path: '/product/create', component: ProductCreatePage,name: 'product-create', meta: {requiresAuth:true}},
  { path: '/product/edit/:productId', component: ProductEditPage,name: 'product-edit', meta: {requiresAuth:true}},
  { path: '/explore-product', component: ExploreProductPage,name: 'explore-product', meta: {requiresAuth:true}},
  { path: '/order', component: OrderListPage,name: 'order', meta: {requiresAuth:true}},
  { path: '/export-manager', component: ExportManagerPage,name: 'export-manager', meta: {requiresAuth:true}},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard untuk memeriksa autentikasi sebelum navigasi ke rute yang memerlukan autentikasi
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth) {
    if (token) {
      next(); // Lanjutkan navigasi jika token ada
    } else {
      next('/login'); // Alihkan ke halaman login jika token tidak ada
    }
  } else {
    next(); // Lanjutkan navigasi untuk rute lainnya
  }
});

export default router;
