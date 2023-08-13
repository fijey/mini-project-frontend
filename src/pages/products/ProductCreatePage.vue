<template>
  <div>
    <NavbarComponent />
    <div class="container mt-5">
      <div class="row">
        <div class="col-sm-12">
        </div>
      </div>
      <div class="row mt-4 d-flex justify-content-center">
        <div class="col-sm-12 text-start slide-in">
          <div class="create-product-form">
            <div class="card shadow tertiary-color text-light">
              <div class="card-body">
                <h4 class="card-title text-center">Create New Product</h4>
                <form @submit.prevent="createProduct" class="row g-3">
                  <div class="col-md-12">
                    <img v-if="previewImage" :src="previewImage" alt="Image Preview" class="mt-2" style="max-width: 100%">
                  </div>
                  <div class="col-md-6">
                    <label for="productImage" class="form-label">Image:</label>
                    <input
                      type="file"
                      class="form-control"
                      id="productImage"
                      accept="image/*"
                      @change="handleImageChange"
                    >
                  </div>
                  <div class="col-md-6">
                    <label for="productName" class="form-label">Product Name:</label>
                    <input v-model="formData.name" type="text" class="form-control name" id="productName" required>
                  </div>
                  <div class="col-md-6">
                    <label for="productPrice" class="form-label">Price:</label>
                    <div class="input-group">
                      <span class="input-group-text">Rp</span>
                      <input v-model="formattedPrice" @input="formatPrice" type="text" class="form-control" id="productPrice" required>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label for="productQuantity" class="form-label">Quantity:</label>
                    <input v-model="formData.quantity" type="number" class="form-control" id="productQuantity" required>
                  </div>
                  <div class="col-md-12">
                    <label for="productDescription" class="form-label">Description:</label>
                    <textarea v-model="formData.description" class="form-control" id="productDescription" rows="3"></textarea>
                  </div>
                  <div class="col-md-12 text-center">
                      <button type="submit" class="btn btn-primary secondary-color text-light mx-3">
                        Save
                      </button>
                      <router-link to="/product">
                        <button type="submit" class="btn secondary-color text-light mx-3 quaternary-color">Cancel</button>
                      </router-link>
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
import { ref, computed } from 'vue';
import api from '@/api/api.js';
import NavbarComponent from '@/components/NavbarComponent.vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

export default {
  components: {
    NavbarComponent
  },
  setup() {
    const toast = useToast();
    const router = useRouter();
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
        // Set the raw price value without formatting
        formData.value.price = newFormattedPrice.replace(/[^\d.]/g, '');
      }
    });

    const createProduct = async () => {
      const token = localStorage.getItem('token');
      try {

        const formDataToSend = new FormData();
        formDataToSend.append('image', formData.value.image);
        formDataToSend.append('name', formData.value.name);
        formDataToSend.append('price', formData.value.price.replace('.', ''));
        formDataToSend.append('quantity', formData.value.quantity);
        formDataToSend.append('description', formData.value.description);


        const response = await api.post('product', formDataToSend, {
          headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
          },
        });

        if (response.status === 201) {
          toast.success("Product Created Succesfully");
          router.push('/product');
        } else {
          toast.error("Product Not Succesfully Created");
        }
      }   catch (error) {
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

  //   const formatPrice = () => {
  //     formData.value.price = formattedPrice.value;
  //   };

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

    return {
      formData,
      formattedPrice,
      createProduct,
      handleImageChange,
      previewImage
    };
  },
};
</script>

<style scoped>
.card-shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>