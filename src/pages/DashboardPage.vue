<template>
    <NavbarComponent/>    
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col col-sm-12 mt-3 col-md-6 col-lg-4">
                <ItemDashboardComponent :label="'Total Pembelian'" :count="25"/>
            </div>
            <div class="col col-sm-12 mt-3 col-md-6 col-lg-4">
                <ItemDashboardComponent :label="'Total Pembelian'" :count="25"/>
            </div>
            <div class="col col-sm-12 mt-3 col-md-6 col-lg-4">
                <ItemDashboardComponent :label="'Total Pembelian'" :count="25"/>
            </div>
            <div class="col col-sm-12 mt-3 col-md-6 col-lg-4">
                <ItemDashboardComponent :label="'Total Pembelian'" :count="25"/>
            </div>
            <div class="col col-sm-12 mt-3 col-md-6 col-lg-4">
                <ItemDashboardComponent :label="'Total Pembelian'" :count="25"/>
            </div>
            <div class="col col-sm-12 mt-3 col-md-6 col-lg-4">
                <ItemDashboardComponent :label="'Total Pembelian'" :count="25"/>
            </div>
        </div>
    </div>
</template>
  
  <script>
//   import { ref } from 'vue';
//   import api from '@/api/api.js';
//   import { useRouter } from 'vue-router';
//   import { useToast } from 'vue-toastification';

import NavbarComponent from '@/components/NavbarComponent.vue';
import ItemDashboardComponent from '@/components/ItemDashboardComponent.vue';
  export default {
    components: {
      NavbarComponent,
      ItemDashboardComponent
    },
    setup() {
   
  
      return {
    
      };
    }
  };
  </script>
  
  <style scoped>
    .card-shadow {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  </style>
  