<template>
    <NavbarComponent/>
    <div class="container mt-5">
        <div class="row">
            <div class="col col-sm-4">
                <router-link to="/product/create">
                    <button class="btn btn-success secondary-color text-light btn-switch">
                        Create Product
                    </button>
                </router-link>
            </div>
            <div class="col col-sm-4">
                <button class="btn btn-success tertiary-color text-light" @click="showFilter=!showFilter">
                    {{ showFilter ? 'Hide Filter' : 'Filter Data' }}
                </button>

            </div>
            <div class="col col-sm-4">
                <button class="btn btn-success text-light" @click="exportExcel">
                    Export Excel
                </button>
            </div>
        </div>
        <div class="row mt-4 d-flex justify-content-center">
            <div class="col-sm-12 text-center slide-in h-50">
                <div class="row" v-if="showFilter">
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
                <label for="product-list">
                    <h4>Your List Product</h4>
                </label>
                <div class="row">
                </div>
                <div class="table-responsive"  style="max-height:10% !important">
                    <table class="table table-hover" id="product-list" v-if="pagination">
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
                            <tr v-for="(product, index) in pagination.data" :key="index">
                                <td>{{ index+1 }}</td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.price }}</td>
                                <td>{{ product.quantity }}</td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <button class="btn btn-sm secondary-color btn-circle text-light" @click="editProduct(product)">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-sm btn-primary btn-circle" @click="showProduct(product)">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn btn-sm btn-danger btn-circle" @click="confirmDelete(product)">
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
    <div class="row mt-4 d-flex justify-content-center" v-if="pagination">
        <div class="col-sm-12 text-center slide-in">
            <button class="btn btn-secondary mx-2" @click="fetchPrevPage" :disabled="!pagination.prev_page_url">Previous Page</button>
            <button class="btn btn-secondary" @click="fetchNextPage" :disabled="!pagination.next_page_url">Next Page</button>
            <p>Page {{ pagination.current_page }} of {{ pagination.last_page }}</p>
            <p>Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} products</p>
        </div>
    </div>
    <div class="modal fade show" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" style="display: block;" v-if="selectedProduct">

        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header tertiary-color text-light">
                    <h5 class="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
                    <button type="button" class="btn-close text-light" data-bs-dismiss="modal" aria-label="Close" @click="confirmClose()"></button>
                </div>
                <div class="modal-body primary-color">
                    Are you sure you want to delete this product?
                </div>
                <div class="modal-footer tertiary-color">
                    <button type="button" class="btn btn-secondary" @click="confirmClose()" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" @click="deleteConfirmed">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade show" id="showModal" tabindex="-1" aria-labelledby="showModalLabel" aria-hidden="true" style="display: block;" v-if="selectedProductShow">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header tertiary-color text-light">
          <h5 class="modal-title" id="showModalLabel">Product Detail</h5>
          <button type="button" class="btn-close text-light" data-bs-dismiss="modal" aria-label="Close" @click="confirmClose()"></button>
        </div>
        <div class="modal-body primary-color">
          <div class="row">
            <div class="col-md-6">
              <img :src="selectedProductShow.image" alt="Product Image" class="img-fluid">
            </div>
            <div class="col-md-6">
              <h4>{{ selectedProductShow.name }}</h4>
              <p>Price: Rp {{ selectedProductShow.price }}</p>
              <p>Quantity: {{ selectedProductShow.quantity }}</p>
              <p>Description: {{ selectedProductShow.description }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer tertiary-color">
          <button type="button" class="btn btn-secondary" @click="confirmClose()" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '@/api/api.js';
import NavbarComponent from '@/components/NavbarComponent.vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

export default {
    components: {
        NavbarComponent,
    },
    setup() {
        const toast = useToast();
        const router = useRouter();
        const productList = ref([]);
        const selectedProduct = ref(null);
        const selectedProductShow = ref(null);
        const showFilter = ref(false);
        const pagination = ref(null)
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
                pagination.value = response.data;
            } catch (error) {
                toast.error('Failed Fetching Data ' + error + '');
                console.error('Error fetching products:', error);
            }
        };

        const exportExcel = async () => {
            try {
                const response = await api.get(`/product/export-excel`);
                console.log(response);
                toast.success('Export Berjalan di Latar Belakang, Cek Progress di Halaman ExportManager');
                toast.info('Estimasi Selesai 10-30 detik');
            } catch (error) {
                toast.error('Failed Fetching Data ' + error + '');
                console.error('Error fetching products:', error);
            }
        }

        const editProduct = (product) => {
            router.push(`/product/edit/${product.id}`);
        };
        const showProduct = (product) => {
            selectedProductShow.value = product;
        };

        const confirmDelete = (product) => {
            selectedProduct.value = product;

        };

        const confirmClose = () => {
            setEmptySelected();
        }

        const deleteConfirmed = async () => {
            if (selectedProduct.value) {
                await deleteProduct(selectedProduct.value);
            }
            setEmptySelected();
        };


        const deleteProduct = async (product) => {
            try {
                const response = await api.delete(`/product/${product.id}`);
                if (response.status === 200) {
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

        const setEmptySelected = () =>{
            selectedProduct.value=null;
            selectedProductShow.value= null;
        }
        
        return {
            editProduct,
            confirmDelete,
            deleteConfirmed,
            confirmClose,
            showProduct,
            fetchNextPage,
            fetchPrevPage,
            resetFilter,
            applyFilters,
            exportExcel,
            showFilter,
            filters,
            productList,
            selectedProduct,
            selectedProductShow,
            pagination
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
