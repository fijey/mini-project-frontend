import "bootstrap/dist/css/bootstrap.css"
import "./assets/my-theme.css"
import { createApp } from "vue/dist/vue.esm-bundler";
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import '@fortawesome/fontawesome-free/css/all.css';


  // Register plugin in your vue app
  
  
const app = createApp(App);
app.use(router);
app.use(Toast); 
app.mount('#app');

import "bootstrap/dist/js/bootstrap.js"