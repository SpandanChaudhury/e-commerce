<template>
  <div>
    <h2>Admin login.</h2>
    <form @submit.prevent>
      <label for="email">Email</label>
      <input type="email" placeholder = 'Email' v-model = 'email'>
      <br><br>
      <label for="password">Password</label>
      <input type="text" placeholder = 'Password' v-model = 'password'>
      <br><br>
      <button @click = 'submit'>Login</button>
      <h2 style = 'color: red' v-if = 'error == 1'> {{ message }} </h2>

    </form>
    <router-link to = '/login'>Not Admin? Login as User</router-link>
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

</style>