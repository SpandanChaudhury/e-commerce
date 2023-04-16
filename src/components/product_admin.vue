<template>
    
        <!-- <h2>{{ product }}</h2>  -->
         <!-- <td> {{ product.product_id }} </td>
        <td> {{ product.product_name }} </td>
        <td> {{ product.price }} </td>
        <td> <a :href= url>Details</a> </td> -->

   <div class="card" style="width: 18rem;">
        <img :src = "getImage(product.image_path)" class="card-img-top" alt="">
        <hr>
        
        <div class = 'card-body'>
            <router-link class = 'card-title' :to = "{
                                                    name: 'productdetails',
                                                    params: {id: product.product_id}
                                                }">
                    <h3>{{ product.product_name}}</h3>
            </router-link>
            <p class = 'card-text' style = 'color: red;'> Rs.{{ product.price }} </p>
            <!-- <button click = "showDetails(product)"> {{ product.product_name }} </button> -->
            <br>
            <button class = 'btn btn-primary' v-if = 'present == 0' @click = 'addToCart(product)'>Add to Cart</button>
            <!-- <button v-if = 'present > 0' @click = 'removeFromCart(product)'>Remove From Cart</button> -->
            <div v-if = 'present > 0' class= 'btn-group'>
                <button class = 'btn btn-primary' @click = 'addToCart(product)'>  +  </button><br>
                <h4 style = 'padding: 10px;'>  {{ present }}   </h4><br>
                <button class = 'btn btn-primary' @click = 'removeFromCart(product)'>  -  </button>

            </div>


        </div>
        <br>
        <br>
    </div>
</template>

<script>
    export default {
        name: 'ProductAdmin',
        props: ['product'],
        data: () => {
            return {
                url: ''
            }
        },
        methods: {
            getImage(url)
            {
                return require('../assets/images/' + url);
            }
        },

        created()
        {
            console.log(this.product);
            this.url = 'http://localhost:8081/details/' + this.product.product_id;
        }
    }
</script>

<style scoped>
    td{
        border: 1px solid black;
    }
    .card{
        height: 500px;
        /* max-height: 700px;
        min-height: 600px; */
    }
    img{
       /* max-height: 400px;
       max-width: 300px; */
       height: 300px;
       width: 300px;
       padding: 20px;
    }
</style>