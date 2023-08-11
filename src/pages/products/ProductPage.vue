<template>
    <NavbarComponent/>    
    <div class="container mt-5">
        <div class="row">
            <div class="col-sm-12">
                <router-link to="/product/create">
                    <button class="btn secondary-color text-light btn-switch" @click="showCreateForm = true">
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
                <table class="table" id="product-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in productList" :key="index">
                            <td>{{ index+1 }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.quantity }}</td>
                        </tr>
                    </tbody>
                </table>
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
        createProduct() {
            this.productList.push({ ...this.newProduct });
            this.cancelCreate();
        },
        cancelCreate() {
            this.showCreateForm = false;
            this.newProduct.name = '';
            this.newProduct.price = 0;
            this.newProduct.quantity = 0;
        },
    },
    watch : {

    }
};
</script>

<style scoped>
.card-shadow {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-switch:hover{
    background-color:var(--ternary-color);
}


button.btn.secondary-color.text-light.btn-switch:hover {
    background-color: var(--quaternary-color);
}
</style>
