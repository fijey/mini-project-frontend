<template>
    <div>
      <NavbarComponent :key="reloadKey"/>
      <div class="container mt-5">
        <div class="text-center">
          <h3>
            Discover the Finest Products at OO-Mart
          </h3>
          <h6>
            Affordable Prices, Premium Quality
          </h6>
        </div>
        <div class="row mt-5">
          <div
            class="col-sm-12 col-md-4"
            v-for="product in products"
            :key="product.id"
          >
            <div class="card shadow">
              <div class="card-img-container">
                <img
                  :src="getImageUrl(product.image)"
                  alt="Product Image"
                  class="card-img-top"
                />
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">Price: Rp {{ product.price }}</p>
                <p class="card-text">Quantity: {{ product.quantity }}</p>
                <p class="card-text description">Description: {{ product.description }}</p>
                <div class="quantity">
                  <button
                    @click="updateCartItemQuantity(product, -1)"
                    class="btn btn-secondary-color text-light"
                  >
                    -
                  </button>
                  <span class="quantity-value">{{ getCartItemQuantity(product) }}</span>
                  <button
                    @click="updateCartItemQuantity(product, 1)"
                    class="btn btn-secondary-color text-light"
                  >
                    +
                  </button>
                </div>
                <button
                  @click="addToCart(product)"
                  class="btn btn-secondary-color text-light"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import NavbarComponent from '@/components/NavbarComponent.vue';
  import api from '@/api/api.js';
  import { useToast } from 'vue-toastification';
  import { useRouter } from 'vue-router';
  
  const products = ref([]);
  const cartItems = ref([]);
  const toast = useToast();
  const route = useRouter();
  const reloadKey = ref(0); // Initialize reload key
  
  const fetchProducts = async () => {
    try {
      const response = await api.get('/product');
      products.value = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  onMounted(() => {
    fetchProducts();
    loadCartItems();
  });
  
  const updateCartItemQuantity = (product, quantityChange) => {
    const cartItem = cartItems.value.find(item => item.product.id === product.id);
  
    if (cartItem) {
      cartItem.quantity += quantityChange;
      if (cartItem.quantity <= 0) {
        removeCartItem(cartItem);
      }
    } else if (quantityChange > 0) {
      cartItems.value.push({ product: product, quantity: 1 });
    }
  
  };
  
  const removeCartItem = (cartItem) => {
    const index = cartItems.value.findIndex(item => item.product.id === cartItem.product.id);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
    }
  };
  
  const addToCart = (product) => {
    // updateCartItemQuantity(product, 1);
    console.log(product);
    saveCartItems();
    reloadKey.value++;
    cartItems.value = [];
  };
  
  const getCartItemQuantity = (product) => {
    const cartItem = cartItems.value.find(item => item.product.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  };
  
  const loadCartItems = () => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      cartItems.value = JSON.parse(storedCartItems);
    }
  };
  
  const saveCartItems = async () => {
    try {

        const response = await api.post('/cart', { cartItems: cartItems.value });

        if (response.status === 200) {
            toast.success('Cart items saved successfully.');
            route.push('/explore-product')
        } else {
            toast.error('Failed to save cart items.');
        }
    } catch (error) {
        toast.error('Error saving cart items:', error);
    }

    // localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
  };
  
  const getImageUrl = (imageName) => {
    if (imageName) {
      return `${imageName}`;
    } else {
      return require('@/assets/logo.png');
    }
  };
  </script>
  
  <style scoped>
  /* ... (Gaya lainnya tetap sama) ... */
  
  .card {
    margin-bottom: 20px; /* Jarak antara setiap kartu */
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .card-img-container {
    width: 100%;
    height: 200px; /* Set the desired height for the images */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }
  
  .card-img-container img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .card-body {
    padding: 10px; /* Padding di dalam kartu */
    display: flex;
    flex-direction: column;
  }
  
  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* Tampilkan satu baris penuh pada deskripsi */
    margin-bottom: 10px;
  }
  .quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0; /* Menambahkan jarak atas dan bawah */
}

.quantity button {
  padding: 5px 10px;
  font-size: 14px;
}

.quantity-value {
  margin: 0 10px; /* Menambahkan jarak kiri dan kanan pada angka jumlah produk */
  font-size: 18px;
}
  </style>
  