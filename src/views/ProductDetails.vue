<template>
    <div>
        <a v-if = 'user == 0' href="/">Back</a>
        <a v-if = 'user == 1' href="/product-list">Back</a>
        <!-- <h2>this is the product details page</h2> -->
        <h2> Product name  - {{ product['product_name'] }} </h2>
        <!-- <img :src="getImage(product['image_path'])" alt=""> -->
        <SliderTrial :images = "path" />
        <h3> Product description - {{ product['description'] }} </h3>
        <h4> Price - {{ product['price'] }} </h4>
        <div v-if = 'user == 1'>
            <button @click = 'editProduct'>Edit</button>
            <button @click = 'deleteProduct'>Delete</button>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import SliderTrial from './slidertrial.vue';
    export default {
        name: 'ProductDetails',
        components: {
            SliderTrial
        },
        props: {
            id: {
                type: String,
                required: true,
            },
            
        },
        data: () => {
            return {
                product: [],
                pid: '', 
                user: 0,
                path: ''
            }
        },
        created(){
            const user = JSON.parse(localStorage.getItem('user'));
            const admin = JSON.parse(localStorage.getItem('admin'));
            if(user != null && admin != null)
            {
                this.user = 0;
            }
            else if(admin == null)
            {
                this.user = 0;
            }
            else if(user == null)
            {
                this.user = 1;
            }
            
            const pid = this.$route.params.id;
            console.log(pid);
            const url = 'http://localhost:3300/getDetails/' + pid;
            axios.get(url)
            .then(response => {
                // console.log(response.data);
                this.product = response.data[0];
                console.log(this.product);
                this.path = this.product['image_path'].split(',');
                console.log(this.path);
            })
            .catch(error => {
                console.log(error);
            })
        },
        methods: {
            getImage(path)
            {
                return require('../assets/images/' + path);
            },
            editProduct()
            {
                this.$router.push('/editProduct/' + this.product.product_id);
            },
            deleteProduct()
            {
                console.log('delete');
                const url = 'http://localhost:3300/delete/' + this.product.product_id;
                const data = {
                    image: this.product.image_path
                };
                axios.post(url, data)
                .then(response => {
                    console.log(response.data);
                    if(response.status == 200)
                        this.$router.push('/product-list');
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
    }
</script>

<style scoped>
    img{
        height:300px;
        width:300px;
    }
</style>