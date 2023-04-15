<template>
  <div>
    <form @submit.prevent>
      <h2 style = 'text-align: center;'>Admin login.</h2>
      <div class="form-group">
          <label for="email">Email ID</label>
          <input type="email" placeholder = 'Email Address' class = 'form-control' v-model = 'email'>
      </div>
      <br>
      <div class="form-group">
          <label for="password">Password</label>
          <input type="text" placeholder = 'password' class = 'form-control' v-model = 'password'>
      </div>
      <button type="reset" class="btn">Reset</button>
      <button type="button"  @click = 'submit' class="btn" style="float:right">Login</button>
      <h4 style = 'color: red' v-if = 'error == 1'> {{ message }} </h4>
      <br>
      <router-link style = 'text-align: center' to = '/login'>Not Admin? Login as User</router-link>

    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  export default {
    name: 'AdminLogin',
    data: () => {
      return {
        email: '',
        password: '',
        error: 0,
        message: ''
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
      submit()
      {
        const url = 'http://localhost:3300/adminLogin';
        const data = {
          email: this.email,
          password: this.password
        };
        axios.post(url, data)
        .then(response => {
          console.log(response.data);
          if(response.status == 205)
          {
            this.error = 1;
            this.message = 'Could not find admin, check your credentials';
          }
          else if(response.status == 203)
          {
            this.error = 1;
            this.message = 'Incorrect Password';

          }
          if(response.status == 200)
          {
            localStorage.setItem('admin', JSON.stringify(response.data));
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
    margin-top: 20px;
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