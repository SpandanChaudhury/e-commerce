<template>
    <div>
        <br>
        <form @submit.prevent>
            <h2 style = 'text-align: center;'> User Login </h2>
            <div class="form-group">
                <label for="email">Email ID</label>
                <input type="email" placeholder = 'Email Address' class = 'form-control' v-model = 'email'>
            </div>
            <br>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="text" placeholder = 'password' class = 'form-control' v-model = 'password'>
            </div>
            <!-- <br> -->
            <!-- <button @click = 'submit' class = 'btn'>Login</button> -->
            <button type="reset" class="btn">Reset</button>
            <button type="button"  @click = 'submit' class="btn" style="float:right">Login</button>
            <h4 style = 'color: red' v-if = 'error == 1'> {{ message }} </h4>
            <!-- <router-link to = '/signup'>New User? Sign Up</router-link> -->
            <br>
            <!-- <br> -->
            <!-- <router-link to = '/admin-login'>Sign in as Admin?</router-link> -->
            <!-- <br> -->
            <div class = 'form-group'>
                <a href = '/signup'> Sign Up</a>
                <router-link to = '/' style = 'float:right;'>Continue without login</router-link>
            </div>
            <br>
        </form>
    </div>
    
  
     

</template>

<script>
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    export default {
        name: 'UserLogin',
        data: () => {
            return {
                email: '',
                password: '',
                message: '',
                error: 0
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
                const data = {
                    email: this.email,
                    password: this.password
                };
                const url = 'http://localhost:3300/login';
                axios.post(url, data)
                .then(response => {
                    console.log(response.data);
                    if(response.status == 204)
                    {
                        console.log('no user found');
                        this.error = 1;
                        this.message = 'No user found, kindly signup first';
                    }
                    else if(response.status == 203)
                    {
                        console.log('incorrect password');
                        this.message = 'Incorrect Password';
                        this.error = 1;
                    }
                    else if(response.status == 200)
                    {
                        localStorage.setItem('user', JSON.stringify(response.data));
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
    min-width:400px;
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