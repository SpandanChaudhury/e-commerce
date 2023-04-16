<template>
    <div class="card" style="width: 18rem;">
        <img :src = "getImage(product.image_path)" class="card-img-top" alt="">
        <hr>
        <p :click = 'setValue(product)'></p>

        <div class = 'card-body'>
            <router-link class = 'card-title' :to = "{
                                                    name: 'productdetails',
                                                    params: {id: product.product_id}
                                                }">
            <h3>{{ product.product_name}}</h3>
            </router-link>
            <p class = 'card-text' style = 'color: red;'> Rs.{{ product.price }} </p>
            <br>
            <button class = 'btn btn-primary' v-if = 'present == 0' @click = 'addToCart(product)'>Add to Cart</button>
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
    import { useRouter } from 'vue-router';
    export default {
        name: 'ProductView',
        props: ["product"],
        data: () => {
            return {
                cart: {},
                present: 0,
                current: {},
            }
        },
        setup(){
            const router = useRouter();
            function showProductDetails(product){
                router.push({
                    name: 'productdetails',
                    params: { id: product.product_id, details: JSON.stringify(product) },
                    // query: { product: JSON.stringify(product)}

                });
            }
            function login_redirect()
            {
                router.push('/login');
            }
            return {
                showProductDetails,
                login_redirect
            }
        },
        methods: {
            getImage(url)
            {
                return require('../assets/images/' + url);
            },
            setValue(product){
                this.current = eval(product);
            },
            removeFromCart(product)
            {
                this.present -= 1;
                product = eval(product);
                this.cart = JSON.parse(localStorage.getItem('cart'));
                for(var key in this.cart)
                {
                    if(key == product.product_id)
                    {
                        this.cart[key] -= 1;
                        
                    }
                }
                localStorage.setItem('cart', JSON.stringify(this.cart));
            },
            addToCart(product)
            {
                // check if logged in or not.
                // const user = JSON.parse(localStorage.getItem('user'));
                // if(user == null || user == undefined)
                //     this.login_redirect();
                // if logged in, then add to cart
                // else
                // {
                    this.present += 1;
                    product = eval(product);
                    console.log(product);
                    this.cart = JSON.parse(localStorage.getItem('cart'));
                    if(this.cart == null)
                        this.cart = {};
                    console.log(this.cart);
                    // if(Object.keys(this.cart).length == 0)
                    // {
                    //     //cart = {};
                    //     this.cart[product.product_id] = 1;
                    // }
                    // else
                    // {
                        var found = 1;
                        for(var key in this.cart)
                        {
                            if (key == product.product_id)
                            {
                                this.cart[key] += 1;
                                found = 0;
                            }
                        }
                        if(found == 1)
                            this.cart[product.product_id] = 1;

                    // }
                    localStorage.setItem('cart', JSON.stringify(this.cart));
                    console.log('product added- ' + product);

                // }
                
            }
            
        },
        mounted(){
            // check if the user is logged in or not, if not display the quantities as 0 else the one stored in localstorage
            this.cart = JSON.parse(localStorage.getItem('cart'));
            if(this.cart == null)
                this.cart = {};
            else
            {
                // this.current = product;
                for(var key in this.cart)
                {
                    if(key == this.current.product_id)
                        this.present = this.cart[key];
                }
                
            }
        },
        
    }
</script>

<style scoped>
    .card{
        height: 600px;
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