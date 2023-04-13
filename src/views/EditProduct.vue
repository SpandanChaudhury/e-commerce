<template>
    <div>
        <h2>EDIT PRODUCT.</h2>
        <button @click = "this.$router.push('/product-list')">Home</button>
        <form  enctype = 'multipart/form-data' @submit.prevent>
            <label for="">Product Name</label>
            <input type="text" placeholder = 'product name' class="text" v-model = 'product.product_name'>
            <br><label for="">Product Description</label><br>
            <!-- <input type="text" placeholder = 'product description' class="text" v-model = 'product.description'> -->
            <textarea placeholder = 'Product Description' id="" cols="30" rows="10" v-model = 'product.description'></textarea>
            <br><label for="">Product Price</label>
            <input type="text" placeholder = 'product price' class="text" v-model = 'product.price'>
             <select v-model = 'product.vendor_id'>
                <option value="">Select vendor</option>
                <option v-for = 'vendor in vendors' :key = 'vendor.vendor_id' :value="vendor.vendor_id">
                    {{ vendor.vendor_id }}. {{ vendor.vendor_name }}
                </option>
            </select>
            <!-- <input type="number" placeholder = 'vendor id' v-model = 'product.vendor_id'> -->
            <br>
            <label for="">Product Image</label>
            <input type="file" ref = 'fileInput'  class="text" multiple>
            <br><button @click = 'edit'> Edit product </button>

            <!-- <img src="..//assets//images//1680842381703-phone.jpg" alt=""> -->
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    export default {
        name: 'EditProduct',
        data: () => {
            return {
                product: [],
                id: '',
                vendors: []
            }
        },
        setup(){
            const router = useRouter();
            function redirect()
            {
                router.push('/product-list');
            }
            return {
                redirect
            }
        },
        methods: {
            edit()
            {
                console.log(this.product);
                // const formData = new FormData(this.product);
                const data = {
                    product_name: this.product.product_name,
                    price: this.product.price,
                    description: this.product.description,
                    vendor_id: this.product.vendor_id
                };

                const url = 'http://localhost:3300/edit/' + this.id;
                axios.post(url, data)
                .then(response => {
                    console.log(response.data);
                    if(response.status == 200)
                    {
                        // location.reload();
                        this.redirect();
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            }
        },
        created()
        {
            if(JSON.parse(localStorage.getItem('admin')) == null)
                this.$router.push('/admin-login');
            this.id = this.$route.params.id;
            // console.log(this.id);
            const url = 'http://localhost:3300/getDetails/' + this.id;
            const url_vendors = 'http://localhost:3300/vendors';
            axios.get(url_vendors)
            .then(response => {
                console.log(response.data);
                if(response.status == 200)
                    this.vendors = response.data;
            });

            axios.get(url)
            .then(response => {
                console.log(response.data[0]);
                this.product = response.data[0];
            })
            .catch(error => {
                console.log(error);
            })
            
        }
    }
</script>

<style scoped>

</style>