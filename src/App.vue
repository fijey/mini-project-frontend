<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted } from 'vue'; // Ganti dengan impor yang sesuai
import router from './router'; // Impor konfigurasi router

export default {
  name: 'App',
  setup() {
    onMounted(() => {
      // Lakukan sesuatu setelah komponen dimuat
    });

    return {
      router,
    };
  },
};
</script>
