<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
