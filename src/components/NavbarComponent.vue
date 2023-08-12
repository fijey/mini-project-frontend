<template>
  <nav class="navbar navbar-expand-lg navbar-dark secondary-color">
    <div class="container">
      <router-link to="/" class="navbar-brand">OO-Mart</router-link>
      <button
        class="navbar-toggler"
        type="button"
        @click="isCollapsed = !isCollapsed"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" :class="{ 'show': !isCollapsed }" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link" :class="{ active: isRouteActive('/dashboard') }" exact>Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/product" :class="{ active: isRouteActive('/product') }" class="nav-link" exact>Product</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/explore-product" :class="{ active: isRouteActive('/buy-product') }" class="nav-link" exact>Explore Product</router-link>
          </li>
        </ul>
      </div>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#" @click="openCartModal">
            <span class="fa-layers fa-fw">
              <i class="fas fa-shopping-cart"></i>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
<!-- Cart Modal -->
<div class="modal" style="display: block;" v-if="isCartModalOpen" @click.self="closeCartModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header tertiary-color text-light">
        <h5 class="modal-title">Shopping Cart ({{ cartQty }})</h5>
        <button type="button" class="close" @click="closeCartModal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body primary-color">
        <div class="row">
            <div v-for="item in cartItems" :key="item.id" class="d-flex">
              <div class="col-md-4">
                <div class="product-image-container">
                  <div class="product-image" :style="{ backgroundImage: 'url(http://127.0.0.1:8000/images/' + item.product.image + ')' }"></div>
                </div>
              </div>
              <div class="col-md-8">
                <h4>{{ item.product.name }}</h4>
                <p>Price: Rp {{ item.product.price }}</p>
                <p>Quantity: {{ item.quantity }}</p>
              </div>
          </div>
        </div>
      </div>
      <div class="modal-footer tertiary-color text-light">
        <button class="btn btn-primary">Checkout</button>
        <button class="btn btn-primary" @click="closeCartModal">Cancel</button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const isCollapsed = ref(true);
const cartQty = ref(0);
const cartItems = ref([]);
const isCartModalOpen = ref(false);
const route = useRoute(); // Get the current route object


const isRouteActive = (routePath) => {
  return route.path.startsWith(routePath);
};

const openCartModal = () => {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.value = storedCartItems;
  cartQty.value = cartItems.value.reduce((total, item) => total + item.quantity, 0);
  isCartModalOpen.value = true;
};

const closeCartModal = () => {
  isCartModalOpen.value = false;
};

onMounted(() => {
  // Initialization code if needed
});
</script>

<style scoped>
/* Tambahkan gaya CSS sesuai kebutuhan Anda */
.nav-link.active {
  color: var(--primary-color);
}
.product-image-container {
  width: 67%;
  padding-top: 67%; /* 1:1 aspect ratio */
  position: relative;
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 85%;
  height: 50%;
  background-position: center;
  background-size: cover;
}
</style>
