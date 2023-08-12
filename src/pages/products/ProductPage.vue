<template>
    <NavbarComponent/>
    <div class="container mt-5">
        <div class="row">
            <div class="col-sm-12">
                <router-link to="/product/create">
                    <button class="btn secondary-color text-light btn-switch">
                        Create Your Own Product
                    </button>
                </router-link>
            </div>
        </div>
        <div class="row mt-4 d-flex justify-content-center">
            <div class="col-sm-12 text-center slide-in">
                <label for="product-list">
                    <h4>Your List Product</h4>
                </label>
                <div class="table-responsive">
                    <table class="table table-hover" id="product-list">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Stok</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in productList" :key="index">
                                <td>{{ index+1 }}</td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.price }}</td>
                                <td>{{ product.quantity }}</td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <button class="btn btn-sm btn-primary btn-circle" @click="editProduct(product)">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-sm btn-danger btn-circle" @click="deleteProduct(product)">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '@/api/api.js';
import NavbarComponent from '@/components/NavbarComponent.vue';
import {useRouter} from 'vue-router';
import {useToast} from 'vue-toastification';

export default {
  components: {
    NavbarComponent,
  },
  setup() {
    const toast = useToast();
    const router = useRouter();
    const productList = ref([]);


    const fetchProducts = async () => {
      try {
        const response = await api.get('/product');
        productList.value = response.data;
      } catch (error) {
        toast.error("Failed Ferching Data "+error+"")
        console.error('Error fetching products:', error);
      }
    };

    const editProduct = (product) => {
      router.push(`/product/edit/${product.id}`);
    };

    const confirmDelete = async (product) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        await deleteProduct(product);
      }
    };

    const deleteProduct = async (product) => {
      try {
        const response = await api.delete(`/product/${product.id}`);
        if (response.status === 204) {
          productList.value = productList.value.filter((p) => p.id !== product.id);
          toast.success('Product deleted successfully.');
        } else {
          toast.error('Failed to delete product.');
        }
      } catch (error) {
        toast.error('Error deleting product: ' + error);
      }
    };

    onMounted(() => {
      fetchProducts();
    });

    return {
      productList,
      editProduct,
      confirmDelete
    };
  },
};
</script>

<style scoped>
.card-shadow {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


button.btn.secondary-color.text-light.btn-switch:hover {
    background-color: var(--quaternary-color);
}

.btn-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
}

.btn-primary.btn-circle {
    background-color: #007bff;
    color: #fff;
}

.btn-danger.btn-circle {
    background-color: #dc3545;
    color: #fff;
}
</style>
