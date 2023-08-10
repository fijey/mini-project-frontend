import "bootstrap/dist/css/bootstrap.css"
import "./assets/my-theme.css"
import { createApp } from "vue/dist/vue.esm-bundler";
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
// import store from './store'; // Sesuaikan dengan path Anda ke store
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(Toast); // Menerapkan komponen Toast
// app.use(store); // Menerapkan komponen Toast
app.mount('#app');

import "bootstrap/dist/js/bootstrap.js"