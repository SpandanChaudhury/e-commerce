<template>
    <div>
        <!-- <h2>this is the add product page for admin .</h2> -->
        <router-link to = '/product-list'>Product List</router-link>
        <form action=""  enctype = 'multipart/form-data' @submit.prevent>
            <label for="">Product Name</label>
            <input type="text" placeholder = 'product name' class="text" v-model = 'pname'>
            <br><label for="">Product Description</label>
            <br>
            <!-- <input type="text" placeholder = 'product description' class="text" v-model = 'pdesc'> -->
            <textarea name="" id="" cols="30" rows="10" v-model = 'pdesc'></textarea>
            <br><label for="">Product Price</label>
            <input type="text" placeholder = 'product price' class="text" v-model = 'price'>
            <select v-model = 'vendor'>
                <option value="">Select vendor</option>
                <option v-for = 'vendor in vendors' :key = 'vendor.vendor_id' :value="vendor.vendor_id">
                    {{ vendor.vendor_id }}. {{ vendor.vendor_name }}
                </option>
            </select>
            <!-- <input type="number" placeholder = 'vendor id' v-model = 'vendor'> -->
            <br>
            <label for="">Product Image</label>
            <input type="file" ref = 'fileInput'  class="text" multiple>
            <br><button @click = 'submit'> Add product </button>

            <!-- <img src="..//assets//images//1680842381703-phone.jpg" alt=""> -->
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    
    import { useRouter } from 'vue-router';
    export default {
        name: 'AddProduct',
        data: () => {
            return {
                admin: {},
                pname: '',
                pdesc: '',
                price: 0,
                vendor: 1,
                files: [],
                vendors: []
            }
        },
        watch: {
            vendor(newv, oldv)
            {
                console.log(newv, oldv);
            }
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
            submit()
            {
                console.log('clicked on submit');
                // console.log(this.vendor);
                let formData = new FormData();
                formData.append('name', this.pname);
                formData.append('description', this.pdesc);
                formData.append('price', this.price);
                formData.append('vendor', this.vendor);
                console.log(formData);
                for(let i = 0; i < this.$refs.fileInput.files.length; i++)
                {
                    const file = this.$refs.fileInput.files[i];
                    console.log(file);
                    formData.append('files', file);
                }
                
                const url = 'http://localhost:3300/addProduct';
                axios.post(url, formData)
                .then(response => {
                    console.log(response.data);
                    if(response.status == 200)
                        this.$router.push('/product-list');
                })
                .catch(error => {
                    console.log(error);
                })
            },
            onFileChange(event)
            {
                this.files = event.target.files;
            }
        },
        created()
        {
            this.admin = JSON.parse(localStorage.getItem('admin'));
            if(this.admin == null)
                this.redirect();
            const url = 'http://localhost:3300/vendors';
            axios.get(url)
            .then(response => {
                console.log(response.data);
                if(response.status == 200)
                    this.vendors = response.data;
                console.log(this.vendors);
            })

        },
    }
</script>

<style scoped>

</style>