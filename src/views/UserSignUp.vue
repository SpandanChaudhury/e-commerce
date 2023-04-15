<template>
    <div>
        <form @submit.prevent>

            <h2 style = 'text-align: center'>Register</h2>
            <div class="mb-3 row">
                <label for="firstName" class="col-sm-4 col-form-label">First Name</label>
                <div class="col-sm-10">
                    <input type="text"  class="form-control-plaintext" id="fname" v-model = 'fname'>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="firstName" class="col-sm-4 col-form-label">Last Name</label>
                <div class="col-sm-10">
                    <input type="text"  class="form-control-plaintext" id="lname" v-model = 'lname'>
                </div>
            </div>
            <!-- <div class="form-group"> -->
                <label for="Gender" class="col-sm-2 col-form-label">Gender</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Male">
                    <label class="form-check-label" for="inlineRadio1">Male</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Female">
                    <label class="form-check-label" for="inlineRadio2">Female</label>
                </div>
            <!-- </div> -->
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Address</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model = 'address'></textarea>
            </div>
           <div class="mb-3 row">
                <label for="firstName" class="col-sm-4 col-form-label">Phone Number</label>
                <div class="col-sm-10">
                    <input type="text"  class="form-control-plaintext" id="phone" v-model = 'phone'>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="firstName" class="col-sm-4 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email"  class="form-control-plaintext" id="email" v-model = 'email'>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="firstName" class="col-sm-4 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password"  class="form-control-plaintext" id="password" v-model = 'password'>
                </div>
            </div>
            <!-- <br><br>
            <br><br>
            <br><br>
            <br><br>
            <br><br>
            <br><br> -->


            <button class = 'btn' @click = 'submit' style="float:right;">Sign Up</button>
            <router-link to = '/login'>Already registered? Login</router-link>
        </form>
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
  min-width:600px;
  max-width:500px;
  padding:20px 20px 90px 20px;
  margin:0 auto;
  background:#ffffff59; 
  -webkit-box-shadow: 3px 3px 23px -9px rgba(0,0,0,0.86);
  -moz-box-shadow: 3px 3px 23px -9px rgba(0,0,0,0.86);
  box-shadow: 3px 3px 23px -9px rgba(0,0,0,0.86);
}

form input, textarea {
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
  background: lightblue !important;
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