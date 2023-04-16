<template>
    <div>
        <NavbarComponent/>
        <!-- <button @click = 'logout'>Log Out</button>
        <router-link to = '/addProduct'> Add Product </router-link>
        <button @click = 'users'>USERS</button>
        <button @click = 'vendors'>Vendors</button>
        <h2>Products' List </h2> -->
     
                <div class="text-center">
                    <div class="row">
                        <div class = 'col' v-for = 'product in products' :key='product.product_id'>
                            <ProductAdmin :product = product />
                        </div>

                    </div>
                </div>
         
        
    </div>
</template>

<script>
    import axios from 'axios';
    import ProductAdmin from '../components/product_admin.vue';
    import NavbarComponent from '../components/navbarComponent.vue'
    import { useRouter } from 'vue-router';
    export default {
        name: 'ProductsList',
        data: () => {
            return {
                admin: {},
                products: []
            }
        },
        components: {
            ProductAdmin,
            NavbarComponent
        },
        setup(){
            const router = useRouter();
            function redirect()
            {
                router.push('/admin-login');
            }
            return {
                redirect
            }
        },
        methods: {
            logout()
            {
                localStorage.removeItem('admin');
                localStorage.removeItem('products');
                this.redirect();
            },
            users()
            {
                this.$router.push('/users');
            },
            vendors()
            {
                this.$router.push('/vendors');
            }
        },
        created()
        {
            this.admin = JSON.parse(localStorage.getItem('admin'));
            if(this.admin == null)
                this.redirect();
            else
            {
                // this.products = JSON.parse(localStorage.getItem('products'));
                // if(this.products == null)
                // {
                    const url = 'http://localhost:3300/';
                    axios.get(url)
                    .then(response => {
                        console.log(response);
                        this.products = response.data;
                        localStorage.setItem('products', JSON.stringify(response.data));
                    })
                    .catch(error => {
                        console.log(error);
                    })
                // }
               
            }
        }
    }
</script>

<style scoped>
    table, th, td, tr{
        border: 1px solid black;
    }
</style>