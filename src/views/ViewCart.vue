<template>
    <div>
        <h3>let's see what you have added to the cart.</h3>
        <router-link to = '/'>Go Back to Shopping</router-link>
        
        <div v-if = 'isEmpty == 0'>
            <h3>The cart is empty.
            </h3>
        </div>
        <div v-if = 'isEmpty == 1'>
            <div v-for = 'product in products' :key='product.product_id'>
                <div v-if = 'check(product.product_id)'>
                    <img :src = 'getImage(product.image_path)' alt="">
                    <h3> {{ product.product_name }} </h3>
                    <h4> {{ product.price }} </h4>
                    <h4> quantity - {{ cart[product.product_id] }}</h4>
                    <p> total - {{ cart[product.product_id] * product.price }}</p>

                </div>
            </div>
        </div>
        <!-- <button @click = 'getTotal()'>get total</button> -->
        <div v-if = 'isEmpty == 1'>
            <h1>Total - {{ totalCost}}</h1>
            <router-link to = '/checkOut'>Check-Out</router-link>

        </div>
    </div>  
</template>

<script>
    import { useRouter } from 'vue-router';
    export default {
        name: 'ViewCart',
        data: () => {
            return {
                cart: {},
                isEmpty: 0,
                products: {},
                orders: [],
                totalCost: 0,
                user: {}
            }
        },
        methods: {
            check(product_id)
            {
                if(product_id in this.cart)
                    if(this.cart[product_id] != 0)
                        return true;
                else
                    return false;
            },

            getImage(url)
            {
                return require('../assets/images/' + url);
            },

            getTotal()
            {
                console.log('calculating');
                for(let i = 0; i < this.products.length; i++)
                {
                    var product = this.products[i];
                    console.log(product);
                    if(this.check(product.product_id))
                    {
                        var total = product.price * this.cart[product.product_id];
                        this.totalCost += total;
                        var entry = {
                            product_id: product.product_id,
                            price: product.price,
                            quantity: this.cart[product.product_id],
                            total: total
                        };
                        console.log(entry);
                        this.orders.push(entry);
                        console.log(this.orders);
                        localStorage.setItem('orders', JSON.stringify(this.orders));
                        localStorage.setItem('bill-amount', JSON.stringify(this.totalCost));
                    }
                }
            },
        },
        created(){
            this.user = JSON.parse(localStorage.getItem('user'));
            if(this.user == null)
            {
                const router = useRouter();
                router.push('/login');

            }
            this.cart = JSON.parse(localStorage.getItem('cart'));
            this.products = JSON.parse(localStorage.getItem('products'));
            if(this.cart == null)
            {
                this.cart = {};
                this.isEmpty = 0;
            }
            else
            {
                var areZero = 1;
                for(var key in this.cart)
                {
                    if(this.cart[key] != 0)
                        areZero = 0;
                }
                if(areZero == 0)
                    this.isEmpty = 1;
                else
                    this.isEmpty = 0;
            }
            this.getTotal();
        }
    }
</script>

<style scoped>

</style>