<template>
    <div>
      <NavbarComponent />
      <div class="container mt-5">
        <div class="row">
          <div class="col-sm-12"></div>
        </div>
        <div class="row mt-4 d-flex justify-content-center">
          <div class="col-sm-12 text-start slide-in">
            <div class="create-product-form">
              <div class="card shadow tertiary-color text-light">
                <div class="card-body">
                  <h4 class="card-title text-center">Edit Product</h4>
                  <form @submit.prevent="updateProduct" class="row g-3">
                    <div class="col-md-12">
                      <img v-if="previewImage" :src="previewImage" alt="Image Preview" class="mt-2" style="max-width: 100%" />
                    </div>
                    <div class="col-md-6">
                      <label for="productImage" class="form-label">Image:</label>
                      <input
                        type="file"
                        class="form-control"
                        id="productImage"
                        accept="image/*"
                        @change="handleImageChange"
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="productName" class="form-label">Product Name:</label>
                      <input v-model="formData.name" type="text" class="form-control" id="productName" required />
                    </div>
                    <div class="col-md-6">
                      <label for="productPrice" class="form-label">Price:</label>
                      <div class="input-group">
                        <span class="input-group-text">Rp</span>
                        <input
                          v-model="formattedPrice"
                          @input="formatPrice"
                          type="text"
                          class="form-control"
                          id="productPrice"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <label for="productQuantity" class="form-label">Quantity:</label>
                      <input v-model="formData.quantity" type="number" class="form-control" id="productQuantity" required />
                    </div>
                    <div class="col-md-12">
                      <label for="productDescription" class="form-label">Description:</label>
                      <textarea v-model="formData.description" class="form-control" id="productDescription" rows="3"></textarea>
                    </div>
                    <div class="col-12 text-center">
                      <button type="submit" class="btn btn-primary secondary-color text-light mx-3">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import api from '@/api/api.js';
  import NavbarComponent from '@/components/NavbarComponent.vue';
  import { useToast } from 'vue-toastification';
  import { useRouter } from 'vue-router';
  
  export default {
    components: {
      NavbarComponent,
    },
    setup() {
      const toast = useToast();
      const router = useRouter();
      const { productId } = router.currentRoute.value.params;
  
      const formData = ref({
        name: '',
        price: '',
        quantity: 0,
        description: '',
        image: null,
      });
  
      const previewImage = ref(null);
  
      const formattedPrice = computed({
        get: () => {
          return formData.value.price.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },
        set: (newFormattedPrice) => {
          formData.value.price = newFormattedPrice.replace(/[^\d.]/g, '');
        },
      });
  
      const fetchProductData = async () => {
        try {
          const response = await api.get(`product/${productId}`);
          const productData = response.data;
  
          formData.value.name = productData.name;
          formData.value.price = productData.price.toString();
          formData.value.quantity = productData.quantity;
          formData.value.description = productData.description;
  
          previewImage.value = `http://127.0.0.1:8000/images/${productData.image}`;
        } catch (error) {
                if (error.response) {
                    const responseData = error.response.data;
                    if (responseData.errors) {
                    const validationErrors = Object.values(responseData.errors).flat();
                    toast.error("Validation Error: " + validationErrors.join(', '));
                    } else {
                    toast.error("Server Error: " + responseData.message);
                    }
                } else {
                    toast.error("Network Error or Other Issue: " + error.message);
                }}
      };
  
      const updateProduct = async () => {
        try {
          const formDataToSend = new FormData();
          if (formData.value.image) {
            formDataToSend.append('image', formData.value.image);
          }
          formDataToSend.append('name', formData.value.name);
          formDataToSend.append('price', formData.value.price.replace('.', ''));
          formDataToSend.append('quantity', formData.value.quantity);
          formDataToSend.append('description', formData.value.description);

          console.log(formDataToSend);
  
          const response = await api.post(`product/${productId}`, formDataToSend);
  
          if (response.status === 200) {
            toast.success('Product Updated Successfully');
            router.push('/product');
          } else {
            toast.error('Product Not Successfully Updated');
          }
        }catch (error) {
                if (error.response) {
                    const responseData = error.response.data;
                    if (responseData.errors) {
                    const validationErrors = Object.values(responseData.errors).flat();
                    toast.error("Validation Error: " + validationErrors.join(', '));
                    } else {
                    toast.error("Server Error: " + responseData.message);
                    }
                } else {
                    toast.error("Network Error or Other Issue: " + error.message);
                }}
      };
  
      const createProduct = async () => {
        // Similar to updateProduct, send create request to server
        // ...
      };
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            previewImage.value = reader.result;
          };
          reader.readAsDataURL(file);
          formData.value.image = file;
        } else {
          previewImage.value = null;
          formData.value.image = null;
        }
      };
  
      onMounted(() => {
        fetchProductData();
      });
  
      return {
        formData,
        formattedPrice,
        previewImage,
        fetchProductData,
        updateProduct,
        createProduct,
        handleImageChange,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles here */
  </style>
  