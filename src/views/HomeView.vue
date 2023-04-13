<template>
  <!-- <img :src="require('../assets/images/phone.jpg')"> -->
  <div>
  <NavbarComponent/>
      <!-- <router-link to = '/viewCart'>View Cart</router-link><br>
      <router-link to = '/login' v-if = 'logged == 10'>Log IN</router-link> <br>
      <div v-if = 'logged == 2'>
        <button @click = 'logout'>LogOut</button>
        <button @click = 'viewOrders'>View Orders</button>
      </div> -->
      <div class="text-center">
        <div class = 'row'>
          <div class = 'col' v-for = 'product in products' :key='product.product_id'>
            
            <ProductView :product = "product"/>
          </div>

        </div>

      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import ProductView from '../components/product.vue';
import NavbarComponent from '../components/navbarComponent.vue';
// import { useRouter } from 'vue-router';
export default {
  name: 'HomeView',
  components: {
    ProductView,
    NavbarComponent
  },
  data: () => {
    return {
      products: [],
      logged: 10
    }
  },
  methods: {
    logout()
    {
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      localStorage.removeItem('bill-amount');
      localStorage.removeItem('orders');
      localStorage.removeItem('products');
      this.logged = 1;
      location.reload();
    },
    viewOrders()
    {
      this.$router.push('/orders');
    }
  },
  created(){
    const user = JSON.parse(localStorage.getItem('user'));
    const admin = JSON.parse(localStorage.getItem('admin'));
    if(user != null && admin != null)
    {
      this.logged = 2;
    }
    else if(user == null && admin == null)
    {
      this.logged = 10;
    }
    else if(user == null)
    {
      this.logged = 1;
    }
    else if(admin == null)
    {
      this.logged = 2;
    }
   
    const storedData = JSON.parse(localStorage.getItem('products'));
    if(storedData == undefined || storedData == null)
    {
      const url = 'http://localhost:3300/';
        axios.get(url)
        .then(response => {
          console.log(response.data);
          localStorage.setItem('products', JSON.stringify(response.data));
          this.products = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    }
    else
    {
      console.log('value present');
      this.products = storedData;
    }
    
  }
}
</script>
