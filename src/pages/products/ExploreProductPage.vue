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
        <div class="col-4">
            <button class="btn btn-success tertiary-color text-light" @click="showFilter=!showFilter">
                {{ showFilter ? 'Hide Filter' : 'Filter Data' }}
            </button>
          </div>
        <div class="row mt-5">
          <div class="row mb-5" v-if="showFilter">
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label for="name" class="form-label">Product Name:</label>
                            <input type="text" class="form-control" v-model="filters.name">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label for="min_price" class="form-label">Min Price:</label>
                            <input type="number" class="form-control" v-model="filters.min_price">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label for="max_price" class="form-label">Max Price:</label>
                            <input type="number" class="form-control" v-model="filters.max_price">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label for="quantity" class="form-label">Stok:</label>
                            <input type="number" class="form-control" v-model="filters.quantity">
                        </div>
                    </div>
                    <div class="col-md-12">
                        <button class="btn btn-primary mx-3" @click="applyFilters">Apply Filters</button>
                        <button class="btn btn-danger" @click="resetFilter">reset</button>
                    </div>
          </div>
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
          <div class="row mt-4 d-flex justify-content-center" v-if="pagination">
            <div class="col-sm-12 text-center slide-in">
              <button class="btn btn-secondary mx-2" @click="fetchPrevPage" :disabled="!pagination.prev_page_url">Previous Page</button>
              <button class="btn btn-secondary" @click="fetchNextPage" :disabled="!pagination.next_page_url">Next Page</button>
              <p>Page {{ pagination.current_page }} of {{ pagination.last_page }}</p>
              <p>Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} products</p>
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
  const pagination = ref(null);
  const showFilter = ref(false);
  const filters = ref({
            'name' : '',
            'min_price' : '',
            'max_price' : '',
            'stok' : ''
        })

        const fetchNextPage = () => {
                console.log(pagination.value.next_page_url);
            if (pagination.value.next_page_url) {
                fetchProducts(pagination.value.current_page + 1);
            }
        };

        const fetchPrevPage = () => {
            if (pagination.value.prev_page_url) {
                fetchProducts(pagination.value.current_page - 1);
            }
        };

        const resetFilter = () => {
            filters.value.name = "";
            filters.value.min_price = "";
            filters.value.max_price = "";
            filters.value.quantity = "";
            fetchProducts(1);
            showFilter.value = false;
        }

        const applyFilters = () => {
            fetchProducts(1);
            showFilter.value = false;
        }
  
  const fetchProducts = async (page = 1) => {
  try {
    const filtersString = JSON.stringify(filters.value); // Konversi objek filters menjadi string JSON
    const response = await api.get(`/product?page=${page}&filters=${encodeURIComponent(filtersString)}`);
    products.value = response.data.data; // Update products
    pagination.value = response.data; // Update pagination data
  } catch (error) {
    toast.error('Failed Fetching Data ' + error + '');
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
  
  
  .card {
    margin-bottom: 20px; 
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .card-img-container {
    width: 100%;
    height: 200px; 
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
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  
  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
    margin-bottom: 10px;
  }
  .quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0; 
}

.quantity button {
  padding: 5px 10px;
  font-size: 14px;
}

.quantity-value {
  margin: 0 10px;
  font-size: 18px;
}
  </style>
  