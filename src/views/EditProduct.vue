<template>
    <div class="container" style = 'padding: 20px;'>
        <form enctype = 'multipart/form-data' @submit.prevent>
            <h2 class = 'd-flex justify-content-center'>EDIT PRODUCT</h2>
            <div class="form-group">
                <label for="name">Product Name :</label>
                <input type="text" class="form-control" name="name" v-model = 'product.product_name'>
            </div>
            <div class="form-group">
                <label for="pdesc">Product Description:</label>
                <textarea class = 'form-control' name="pdesc" id="" cols="30" rows="10" v-model = 'product.description'></textarea>
            </div>
            <div class="form-group">
                <label for="price">Product Price</label>
                <input type="text" class="form-control" name="price" v-model = 'product.price'>
            </div>
            <div class="form-group">
                <label for="vendor">Vendor: </label>
                    <select name = 'vendor' v-model = 'product.vendor_id' class = 'form-control'>
                            <option value="" selected>Select vendor</option>
                            <option v-for = 'vendor in vendors' :key = 'vendor.vendor_id' :value="vendor.vendor_id">
                                {{ vendor.vendor_id }}. {{ vendor.vendor_name }}
                            </option>
                    </select> 
            </div>   
            <div class="form-group">
                <label for="">Product Image</label>
                <input type="file" ref = 'fileInput'  class="text form-control" multiple>
            </div>
            <!-- <button type="reset" class="btn">Reset</button> -->
            <button type="button" @click = 'edit' class="btn col-12" style="text-align:center;">Edit</button>
            <div class="form-group">
                <router-link class = 'd-flex justify-content-center' to = '/product-list'>Back</router-link>
            </div>
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
    form {
  min-width:400px;
  max-width:500px;
  padding:20px;
  margin:0 auto;
  background:#ffffff59; 
  -webkit-box-shadow: 3px 3px 23px -9px rgba(0,0,0,0.86);
  -moz-box-shadow: 3px 3px 23px -9px rgba(0,0,0,0.86);
  box-shadow: 3px 3px 23px -9px rgba(0,0,0,0.86);
}

form input {
  border:1px solid black;
    border-radius:0 !important;
    padding:5px 8px;
    color:#444;
}

form button {
  color:#555;
  background:#ffffffad;
  border:1px solid #fff !important;
  margin-top:20px;
  border-radius:0px Important;
}

form button:hover {
  background:#70e1f5 !important;
}

.pull-right {
  float:right;
}
body {
  background: #70e1f5;
  background: -webkit-linear-gradient(to right, #ffd194, #70e1f5);  
  background: linear-gradient(to right, #ffd194, #70e1f5);
}
</style>