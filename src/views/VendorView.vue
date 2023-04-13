<template>
    <div>   
        <!-- <h1>this is the specific vendor view </h1> -->
        <router-link to = '/vendors'>Vendors List</router-link>
        <div v-if = 'present == 1'>
            <h2>No products found </h2>
        </div>
        <div v-if = 'present == 0'>
            <table>
                <thead>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Price</th>
                </thead>
                <tbody>
                    <tr v-for = 'product in products' :key='product.product_id'>
                        <td> {{ product.product_id }} </td>
                        <td> {{ product.product_name }} </td>
                        <td> {{ product.description }} </td>
                        <td> {{ product.price }} </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'VendorView',
        data: () => {
            return {
                id: '',
                present: 0,
                products: []
            }
        },
        created()
        {
            const admin = JSON.parse(localStorage.getItem('admin'));
            if(admin == null)
                this.$route.push('/admin-login');
            this.id = this.$route.params.id;
            console.log(this.id);
            const url = 'http://localhost:3300/vendors/' + this.id;
            axios.get(url)
            .then(response => {
                console.log(response.data);
                if(response.status == 203)
                    this.present = 1;
                else if(response.status == 200)
                    this.products = response.data;
                
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
</script>

<style scoped>
    table, tbody, thead, th, td {
        border: 1px solid black;
    }
</style>