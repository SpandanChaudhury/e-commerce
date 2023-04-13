<template>
    <div>
        <h2>Welcome new user</h2>
        <form @submit.prevent>

            <div class="form-group">

                <label for="firstname">First Name</label>
                <input type="text" placeholder = 'First Name'  class = 'form-control' v-model = 'fname'>
            </div>
            <div class="form-group">
                <!-- <br><br> -->
                <label for="lasttname">Last Name</label>
                <input type="text" placeholder = 'Last Name' class = 'form-control'  v-model = 'lname'>

            </div>
            <div class="form-group">
                <label for="Gender">Gender</label>
                <br>
                <input type="radio" value = 'Female'  class = 'form-control' v-model = 'gender'>Female
                <input type="radio" value = 'Male'  class = 'form-control' v-model = 'gender'>Male

            </div>
            <div class="form-group">
                <label for="address">Address</label><br>
                <!-- <input type="text" placeholder = 'Address' v-model = 'address'> -->
                <textarea name="address" placeholder="Address"  class = 'form-control' v-model = 'address' id="" cols="30" rows="10"></textarea>

            </div>
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type='number' placeholder = 'Phone Number' class = 'form-control'  v-model = 'phone'>

            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" placeholder = 'Email' class = 'form-control'  v-model = 'email'>

            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="text" placeholder = 'Password' class = 'form-control'  v-model = 'password'>

            </div>
            <!-- <br><br>
            <br><br>
            <br><br>
            <br><br>
            <br><br>
            <br><br> -->


            <button @click = 'submit'>Sign Up</button>
        </form>
        <router-link to = '/login'>Already registered? Login</router-link>
    </div>
</template>

<script>
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    export default {
        name: 'UserSignup',
        data: () => {
            return {
                fname: '',
                lname: '',
                address: '',
                email: '',
                password: '',
                phone: ''
            }
        },
        setup(){
            const router = useRouter();
            function redirect()
            {
                router.push('/');
            }
            return {
                redirect
            }
        },
        methods: {
            submit()
            {
                const url = 'http://localhost:3300/signup';
                const data = {
                    fname: this.fname,
                    lname: this.lname,
                    address: this.address,
                    phone: this.phone,
                    gender: this.gender,
                    email: this.email,
                    password: this.password
                };
                console.log(data);
                axios.post(url, data)
                .then(response => {
                    console.log(response.data);
                    if(response.status == 200)
                    {
                        localStorage.setItem('user', JSON.stringify(data));
                        this.redirect();
                    }

                })
                .catch(error => {
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>
    form {
  min-width:300px;
  max-width:400px;
  padding:20px;
  margin:0 auto;
  background:#ffffff59; 
  -webkit-box-shadow: 3px 3px 23px -9px rgba(0,0,0,0.86);
  -moz-box-shadow: 3px 3px 23px -9px rgba(0,0,0,0.86);
  box-shadow: 3px 3px 23px -9px rgba(0,0,0,0.86);
}

form input {
  border:1px solid #eee;
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
  background:#fff !important;
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