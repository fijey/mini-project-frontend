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
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" >
            <router-link to="/dashboard" class="nav-link" :class="{ active: isRouteActive('/dashboard') }" exact>Dashboard</router-link>
          </li>
          <li class="nav-item" >
            <router-link to="/make-product" :class="{ active: isRouteActive('/make-product') }" class="nav-link" exact>Make Product</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/buy-product" :class="{ active: isRouteActive('/buy-product') }" class="nav-link" exact>Buy Product</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  methods: {
    isRouteActive(route) {
      return this.$route.path === route;
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
