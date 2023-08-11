<template>
    <NavbarComponent/>    
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
                                <div class="col-md-6">
                                    <label for="productName" class="form-label">Product Name:</label>
                                    <input v-model="newProduct.name" type="text" class="form-control" id="productName" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="productPrice" class="form-label">Price:</label>
                                    <div class="input-group">
                                        <span class="input-group-text">Rp</span>
                                        <input v-model="newProduct.price" type="number" class="form-control" id="productPrice" step="0.01" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="productQuantity" class="form-label">Quantity:</label>
                                    <input v-model="newProduct.quantity" type="number" class="form-control" id="productQuantity" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="productImage" class="form-label">Image:</label>
                                    <input type="file" class="form-control" id="productImage" accept="image/*">
                                </div>
                                <div class="col-md-12">
                                    <label for="productDescription" class="form-label">Description:</label>
                                    <textarea v-model="newProduct.description" class="form-control" id="productDescription" rows="3"></textarea>
                                </div>
                                <div class="col-12 text-center">
                                    <button type="submit" class="btn btn-primary secondary-color text-light mx-3">Create</button>
                                    <router-link to="/product">
                                        <button type="button" class="btn quaternary-color">Cancel</button>
                                    </router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';

export default {
    components: {
        NavbarComponent,
    },
    data() {
        return {
            productList: [
                { name: 'Product A', price: 10.99, quantity: 20 },
                { name: 'Product B', price: 25.49, quantity: 15 },
                { name: 'Product C', price: 5.99, quantity: 50 },
                // Add more dummy data here
            ],
            newProduct: {
                name: '',
                price: 0,
                quantity: 0,
            },
            showCreateForm: false,
        };
    },
    methods: {
      
    },
    watch : {

    }
};
</script>

<style scoped>
.card-shadow {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

</style>
