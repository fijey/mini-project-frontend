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
              <span class="fa-layers-counter fa-layers-top-right bg-warning">{{ calculateQty() }}</span>
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
        <h5 class="modal-title">Shopping Cart ({{ calculateQty() }})</h5>
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
              <div class="row">
                <div class="col-sm-3">
                  <p>Quantity: 
                    {{ item.quantity }}
                  </p>
                </div>
                <div class="col-sm-9">
                  <button @click="decrementQuantity(item)" class="btn btn-secondary-color text-light mx-3">-</button>
                  <button @click="incrementQuantity(item)" class="btn btn-secondary-color text-light">+</button>
                </div>
                <hr class="mt-3 secondary-color">
              </div>
            </div>
          </div>
          <h4 class="text-end" v-if="calculateTotal() > 0">SUB TOTAL : {{calculateTotal()}}</h4>
        </div>
      </div>
      <div class="modal-footer tertiary-color text-light">
        <button class="btn btn-primary" @click="checkout">Checkout</button>
        <button class="btn btn-primary" @click="closeCartModal">Cancel</button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/api/api.js';
import { useToast } from 'vue-toastification';

const isCollapsed = ref(true);
const cartQty = ref(0);
const cartItems = ref([]);
const isCartModalOpen = ref(false);
const route = useRoute(); // Get the current route object
const toast = useToast();
const checkout = async () => {
  try {
    const response = await api.post('/order', cartItems.value); // Ganti dengan endpoint API Anda
    // Tampilkan pesan sukses atau lakukan tindakan lain yang diperlukan
    console.log(response.data.message);
    toast.success('Checkout successful!');
    getCart();
    // Tutup modal setelah berhasil checkout
    closeCartModal();
  } catch (error) {
      toast.error('Error during checkout:', error);
    // Tampilkan pesan kesalahan atau lakukan tindakan lain yang diperlukan
    if (error.response) {
        toast.error('Request error:', error.message);
    } 
  }
};


const isRouteActive = (routePath) => {
  return route.path.startsWith(routePath);
};

const incrementQuantity = (cartItem) => {
  cartItem.quantity++;
};

const decrementQuantity = (cartItem) => {
  if (cartItem.quantity > 1) {
    cartItem.quantity--;
  } else {
    const index = cartItems.value.findIndex(item => item.id === cartItem.id);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
    }
  }
};

const calculateSubtotal = (cartItem) => {
  return cartItem.product.price * cartItem.quantity;
};

const calculateTotal = () => {
  return cartItems.value.reduce((total, item) => total + calculateSubtotal(item), 0);
};
const calculateQty = () => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
};


const openCartModal = async () => {
  try {
    // const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    isCartModalOpen.value = true;
  } catch (error) {
    console.error('Error fetching cart count:', error);
  }
};

const closeCartModal = () => {
  isCartModalOpen.value = false;
};

const getCart = async () => {
  try {
    const response = await api.get('/cart'); // Replace with your actual API endpoint
    cartQty.value = response.data.cart.cartCount;
    cartItems.value = response.data.cart.cartItems;
  } catch (error) {
    console.error('Error fetching cart:', error);
    // Handle the error here, you can show an error message to the user or take other appropriate actions.
  }
}

onMounted( async () => {
  getCart();
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
.fa-layers-counter {
  position: relative;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  color: white;
}
</style>
