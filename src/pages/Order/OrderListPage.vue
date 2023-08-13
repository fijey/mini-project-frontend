<template>
    <div>
      <NavbarComponent />
      <div class="container mt-5">
        <h2 class="text-center mb-4">Order List</h2>
        <div class="row">
          <div class="col-md-12">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Invoice No</th>
                  <th>Sub Total</th>
                  <th>Order Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in orders" :key="order.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ order.invoiceNo }}</td>
                  <td>{{ order.subTotal }}</td>
                  <td>{{ formatDate(order.orderDate) }}</td>
                  <td>
                    <button class="btn btn-primary" @click="showProductList(order)">Detail</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- Modal for Product List -->
      <div class="modal" v-if="selectedOrder" style="display: block;">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header tertiary-color text-light">
              <h3 class="modal-title">Order Detail: {{ selectedOrder.invoiceNo }}</h3>
              <button type="button" class="btn-close" @click="closePopup"></button>
            </div>
            <div class="modal-body primary-color">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in selectedOrder.products" :key="product.id">
                    <td>
                      <img :src="'http://127.0.0.1:8000/images/'+product.product.image" class="product-image" alt="Product Image" />
                    </td>
                    <td>{{ product.product.name }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>{{ formatCurrency(product.product.price) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import NavbarComponent from '@/components/NavbarComponent.vue';
  import api from '@/api/api.js';
  
  export default {
    components: {
      NavbarComponent,
    },
    setup() {
      const orders = ref([]);
      const selectedOrder = ref(null);
  
      const fetchOrders = async () => {
        try {
          const response = await api.get('http://127.0.0.1:8000/api/order'); // Replace with your API endpoint
          orders.value = response.data.data.map((order) => ({
            id: order.id,
            invoiceNo: `INV-${order.id}-${order.invoice}`,
            subTotal: order.sub_total,
            orderDate: order.created_at,
            products: order.order_details,
          }));
        } catch (error) {
          // Handle error
        }
      };
  
      const formatCurrency = (value) => {
        return `$${value.toFixed(2)}`;
      };
  
      const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
      };
  
      const showProductList = (order) => {
        selectedOrder.value = { ...order }; // Clone the order object to prevent direct modification
      };
  
      const closePopup = () => {
        selectedOrder.value = null;
      };
  
      onMounted(() => {
        fetchOrders();
      });
  
      return {
        orders,
        selectedOrder,
        formatCurrency,
        formatDate,
        showProductList,
        closePopup,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles for product image */
  .product-image {
    max-width: 60px;
    max-height: 60px;
    margin-right: 10px;
  }
  </style>