<template>
    <div>
        <!-- <h3>let's see what you have added to the cart.</h3>
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
      <button @click = 'getTotal()'>get total</button> -->
        <!-- <div v-if = 'isEmpty == 1'>
            <h1>Total - {{ totalCost}}</h1>
            <router-link to = '/checkOut'>Check-Out</router-link>

        </div> -->
        <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"> -->
        <div id="cart" style="max-width:960px">
            <div class="back">
                <router-link to = '/'>&#11178; shop</router-link>
            </div>
            <h1>Your Cart</h1>
            <div class="container-fluid">
                <div class="row align-items-start">
                    <div class="col-12 col-sm-8 items" v-if = 'isEmpty == 1'>
                        <!--1-->
                        <div  v-for = 'product in products' :key='product.product_id'>
                            <div v-if = 'check(product.product_id)' class="cartItem row align-items-start">
                                <div class="col-3 mb-2">
                                    <img class="w-100" style = 'max-height: 150px' :src="getImage(product.image_path)" alt="art image">
                                </div>
                                <div class="col-5 mb-2">
                                    <h5 class=""> {{ product.product_name }} </h5>
                                    <p class="pl-1 mb-0"> Rs. {{ product.price }} </p>
                                    <!-- <p class="pl-1 mb-0">Matte Print</p> -->
                                </div>
                                <div class="col-2">
                                    <p class="cartItemQuantity p-1 text-center"> {{ cart[product.product_id] }} </p>
                                </div>
                                <div class="col-2">
                                    <p id="cartItem1Price"> {{ product.price * cart[product.product_id] }} </p>
                                </div>

                                <hr>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-4 p-4 proceed form" v-if = 'isEmpty == 1'>
                        <div class="row m-0">
                            <div class="col-sm-8 p-0">
                                <h6>Subtotal</h6>
                            </div>
                            <div class="col-sm-4 p-0" v-if = 'isEmpty == 1'>
                                <p id="subtotal">Rs. {{ totalCost}} </p>
                            </div>
                        </div>
                        <div class="row m-0">
                            <div class="col-sm-8 p-0 ">
                                <h6>Tax</h6>
                            </div>
                            <div class="col-sm-4 p-0">
                                <p id="tax">Rs. 0</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row mx-0 mb-4">
                            <div class="col-sm-8 p-0 d-inline">
                                <h5>Total</h5>
                            </div>
                            <div class="col-sm-4 p-0">
                                <p id="total">Rs. {{ totalCost }} </p>
                            </div>
                        </div>
                        <router-link to = '/checkOut'><button id="btn-checkout" class="shopnow"><span>Checkout</span></button></router-link>
                    </div>
                    <div v-if = 'isEmpty == 0'>
                      <h2>
                        Your Cart is currently empty, add items to view.
                      </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>

<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"></script> -->
      
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "ViewCart",
  data: () => {
    return {
      cart: {},
      isEmpty: 0,
      products: {},
      orders: [],
      totalCost: 0,
      user: {},
    };
  },
  methods: {
    check(product_id) {
      if (product_id in this.cart)
        if (this.cart[product_id] != 0) return true;
        else return false;
    },

    getImage(url) {
      return require("../assets/images/" + url);
    },

    getTotal() {
      console.log("calculating");
      for (let i = 0; i < this.products.length; i++) {
        var product = this.products[i];
        console.log(product);
        if (this.check(product.product_id)) {
          var total = product.price * this.cart[product.product_id];
          this.totalCost += total;
          var entry = {
            product_id: product.product_id,
            price: product.price,
            quantity: this.cart[product.product_id],
            total: total,
          };
          console.log(entry);
          this.orders.push(entry);
          console.log(this.orders);
          localStorage.setItem("orders", JSON.stringify(this.orders));
          localStorage.setItem("bill-amount", JSON.stringify(this.totalCost));
        //   return this.totalCost;
        }
      }
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user == null) {
      const router = useRouter();
      router.push("/login");
    }
    this.cart = JSON.parse(localStorage.getItem("cart"));
    this.products = JSON.parse(localStorage.getItem("products"));
    if (this.cart == null) {
      this.cart = {};
      this.isEmpty = 0;
    } else {
      var areZero = 1;
      for (var key in this.cart) {
        if (this.cart[key] != 0) areZero = 0;
      }
      if (areZero == 0) this.isEmpty = 1;
      else this.isEmpty = 0;
    }
    this.getTotal();
  },
};
</script>

<style scoped>

#cart {
  max-width: 1440px;
  padding-top: 60px;
  margin: auto;
}
.form div {
  margin-bottom: 0.4em;
}
.cartItem {
  --bs-gutter-x: 1.5rem;
}
.cartItemQuantity,
.proceed {
  background: #f4f4f4;
}
.items {
  padding-right: 30px;
}
#btn-checkout {
  min-width: 100%;
}

/* stasysiia.com */
@import url("https://fonts.googleapis.com/css2?family=Exo&display=swap");
body {
  background-color: #fff;
  font-family: "Exo", sans-serif;
  font-size: 22px;
  margin: 0;
  padding: 0;
  color: #111111;
  justify-content: center;
  align-items: center;
}
a {
  color: #0e1111;
  text-decoration: none;
}
.btn-check:focus + .btn-primary,
.btn-primary:focus {
  color: #fff;
  background-color: #111;
  border-color: transparent;
  box-shadow: 0 0 0 0.25rem rgb(49 132 253 / 50%);
}
button:hover,
.btn:hover {
  box-shadow: 5px 5px 7px #c8c8c8, -5px -5px 7px white;
}
button:active {
  box-shadow: 2px 2px 2px #c8c8c8, -2px -2px 2px white;
}

/*PREVENT BROWSER SELECTION*/
a:focus,
button:focus,
input:focus,
textarea:focus {
  outline: none;
}
/*main*/
main:before {
  content: "";
  display: block;
  height: 88px;
}
h1 {
  font-size: 2.4em;
  font-weight: 600;
  letter-spacing: 0.15rem;
  text-align: center;
  margin: 30px 6px;
}
h2 {
  color: rgb(37, 44, 54);
  font-weight: 700;
  font-size: 2.5em;
}
h3 {
  border-bottom: solid 2px #000;
}
h5 {
  padding: 0;
  font-weight: bold;
  color: #92afcc;
}
p {
  color: #333;
  font-family: "Roboto", sans-serif;
  margin: 0.6em 0;
}
h1,
h2,
h4 {
  text-align: center;
  padding-top: 16px;
}
/* yukito bloody */
.back {
  position: relative;
  top: -30px;
  font-size: 16px;
  margin: 10px 10px 3px 15px;
}
.inline {
  display: inline-block;
}

.shopnow,
.contact {
  background-color: #000;
  padding: 10px 20px;
  font-size: 30px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.5s;
  cursor: pointer;
}
.shopnow:hover {
  text-decoration: none;
  color: white;
  background-color: #c41505;
}
/* for button animation*/
.shopnow span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: all 0.5s;
}
.shopnow span:after {
  content: url("https://badux.co/smc/codepen/caticon.png");
  position: absolute;
  font-size: 30px;
  opacity: 0;
  top: 2px;
  right: -6px;
  transition: all 0.5s;
}
.shopnow:hover span {
  padding-right: 25px;
}
.shopnow:hover span:after {
  opacity: 1;
  top: 2px;
  right: -6px;
}
.ma {
  margin: auto;
}
.price {
  color: slategrey;
  font-size: 2em;
}
#mycart {
  min-width: 90px;
}
#cartItems {
  font-size: 17px;
}
#product .container .row .pr4 {
  padding-right: 15px;
}
#product .container .row .pl4 {
  padding-left: 15px;
}

</style>