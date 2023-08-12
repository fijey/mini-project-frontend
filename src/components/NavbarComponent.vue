<template>
  <nav class="navbar navbar-expand-lg navbar-dark secondary-color">
    <div class="container">
      <router-link to="/" class="navbar-brand">OO-Mart</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link" :class="{ active: isRouteActive('/dashboard') }" exact>Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/product" :class="{ active: isRouteActive('/product') }" class="nav-link" exact>Product</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/buy-product" :class="{ active: isRouteActive('/buy-product') }" class="nav-link" exact>Buy Product</router-link>
          </li>
        </ul>
      </div>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span class="fa-layers fa-fw">
              <i class="fas fa-shopping-cart"></i>
              <span class="fa-layers-counter" v-if="cartQty > 0">{{ cartQty }}</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
export default {
  name: 'NavbarComponent',
  data() {
    return {
      cartQty: 15, // Initialize with your actual cart quantity
    };
  },
  methods: {
    isRouteActive(route) {
      return this.$route.path.startsWith(route); // Check for partial match
    }
  }
};
</script>

<style scoped>
/* Tambahkan gaya CSS sesuai kebutuhan Anda */
.nav-link.active {
  color: var(--primary-color);
}
</style>
