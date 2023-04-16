<template>
    <div>   
        <!-- <h1>this is the specific vendor view </h1> -->
      <div class="text-center" style="padding: 30px;">
        <router-link class = 'row' to = '/vendors'>Vendors List</router-link>
        <div class = 'row' v-if = 'present == 1'>
            <h2>No products found </h2>
        </div>
        <div class = 'row' v-if = 'present == 0'>
          <div class = 'col' v-for = 'product in products' :key='product.product_id'>
            <!-- <h2>{{ product }} </h2> -->
            <ProductView :product = "product"/>
          </div>

        </div>

      </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import ProductView from '../components/product.vue';
    export default {
        name: 'VendorView',
        components: {
            ProductView
        },
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