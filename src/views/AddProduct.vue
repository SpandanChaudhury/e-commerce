<template>
    <div class="container" style = 'padding: 20px;'>
        <form enctype = 'multipart/form-data' @submit.prevent>
            <h2 class = 'd-flex justify-content-center'>ADD PRODUCT</h2>
            <div class="form-group">
                <label for="name">Product Name :</label>
                <input type="text" class="form-control" name="name" v-model = 'pname'>
            </div>
            <div class="form-group">
                <label for="pdesc">Product Description:</label>
                <textarea class = 'form-control' name="pdesc" id="" cols="30" rows="10" v-model = 'pdesc'></textarea>
            </div>
            <div class="form-group">
                <label for="price">Product Price</label>
                <input type="text" class="form-control" name="price" v-model = 'price'>
            </div>
            <div class="form-group">
                <label for="vendor">Vendor: </label>
                    <select name = 'vendor' v-model = 'vendor' class = 'form-control'>
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
            <button type="reset" class="btn">Reset</button>
            <button type="button" @click = 'submit' class="btn" style="float:right">Submit</button>
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