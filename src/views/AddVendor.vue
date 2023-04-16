<template>
    


        <div class="container" style = 'padding: 20px;'>
        <form enctype = 'multipart/form-data' @submit.prevent>
            <h2 class = 'd-flex justify-content-center'>ADD VENDOR</h2>
            <div class="form-group">
                <label for="name">Vendor Name :</label>
                <input type="text" class="form-control" name="name" v-model = 'name'>
            </div>
            <div class="form-group">
                <label for="address">Vendor's Address:</label>
                <textarea class = 'form-control' name="address" id="" cols="30" rows="10" v-model = 'address'></textarea>
            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="text" class="form-control" name="phone" v-model = 'phone'>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name = 'email' class="form-control" v-model = 'email'>
            </div>
            <button type="reset" class="btn">Reset</button>
            <button type="button" @click = 'submit' class="btn" style="float: right;">Add</button>
            <div class="form-group">
                <router-link class = 'd-flex justify-content-center' to = '/vendors'>Back</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'AddVendor',
        data: () => {
            return {
                name: '',
                email: '',
                phone: '',
                address: ''
            }
        },
        methods: {
            submit()
            {
                const url = 'http://localhost:3300/addVendor';
                const data = {
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    address: this.address
                };
                axios.post(url, data)
                .then(response => {
                    console.log(response.data);
                    if(response.status == 200)
                        this.$router.push('/vendors');
                })
                .catch(error => {
                    console.log(error);
                })
            }

        },
        created()
        {
            const admin = JSON.parse(localStorage.getItem('admin'));
            if(admin == null)
                this.$router.push('/admin-login');
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