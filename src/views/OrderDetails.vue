<template>
    <!-- <div>
        <h2>this is the order details page.</h2>
        <table>
            <thead>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price Per Unit </th>
                <th> Quantity </th>
                <th> Total Cost </th>
            </thead>
            <tbody>
                <tr v-for = 'order in orders' :key = 'order.order_id'>
                    <td> {{ order.product_id }} </td>
                    <td> {{ order.product_name }} </td>
                    <td> {{ order.price }} </td>
                    <td> {{ order.quantity }} </td>
                    <td> {{ order.total_cost }} </td>
                </tr>
            </tbody>
        </table>
    </div> -->
    <div class="card">
            <router-link  class = 'info' v-if = 'user == 1' to = '/orders'>Back</router-link>
            <router-link  class = 'info' v-if = 'user == 0' to = '/users'>Back</router-link>
            <div class="title">Purchase Reciept</div>
            <div class="info">
                <div class="row">
                    <div class="col-7">
                        <span id="heading">Date</span><br>
                        <span id="details">10 October 2018</span>
                    </div>
                    <div class="col-5 pull-right">
                        <span id="heading">Order No.</span><br>
                        <span id="details"> {{ id }}</span>
                    </div>
                </div>      
            </div>      
            <div class="pricing">
                <div class="row" v-for = 'order in orders' :key = 'order.order_id'>
                    <div class="col-3">
                        <span id="name"> {{ order.product_name }} </span>  
                    </div>
                    <div class="col-3">
                        <span id="name"> Rs.{{ order.price }} </span>  
                    </div>
                    <div class="col-3">
                        <span id="name"> {{ order.quantity }}pc. </span>  
                    </div>
                    <div class="col-3">
                        <span id="price" > Rs.{{ order.total_cost }}</span>
                    </div>
                </div>
                <!-- <div class="row">
                    <div class="col-9">
                        <span id="name">Shipping</span>
                    </div>
                    <div class="col-3">
                        <span id="price">&pound;33.00</span>
                    </div>
                </div> -->
            </div>
            <div class="total">
                <div class="row">
                    <div class="col-9">
                        <button class = 'btn btn-primary ' @click = 'calc'>View Total</button>
                    </div>
                    <div class="col-3"><big>Rs. {{ cost }}</big></div>
                </div>
            </div>
          
                
               
           
        </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'OrderDetails',
        data: () => {
            return {
                id: '',
                orders: [],
                cost: 0,
                user: 0
            }
        },
        methods: {
            calc()
            {
                
                for(var i = 0; i < this.orders.length; i++)
                    this.cost += parseFloat(this.orders[i].total_cost);
            }
        },
        created()
        {
            const user = JSON.parse(localStorage.getItem('user'));
            const admin = JSON.parse(localStorage.getItem('admin'));
            if(user == null && admin == null)
            {
                this.$route.push('/login');
            }
            else if(user == null)
            {
                this.user = 0;
            }
            else if(admin == null)
            {
                this.user = 1;
            }
            
            this.id = this.$route.params.id;
            // console.log(this.id);
            const url = 'http://localhost:3300/orders/' + this.id;
            axios.get(url)
            .then(response => {
                console.log(response.data);
                this.orders = response.data;
            })
            .catch(error => {
                console.log(error);
            })

        }
    }
</script>

<style scoped>
    table, tbody, thead, th, td {
        border: 1px solid black;
    }
    body{
    background: #ddd3;
    height: 100vh;
    vertical-align: middle;
    display: flex;
    font-family: Muli;
    font-size: 14px;    
}
.card{
    margin: auto;
    margin-top: 20px;
    width: 38%;
    max-width:600px;
    padding: 4vh 0;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-top: 3px solid rgb(9, 30, 96);
    border-bottom: 3px solid rgb(9, 30, 96);
    border-left: none;
    border-right: none;
}
@media(max-width:768px){
    .card{
        width: 90%;
    }
}
.title{
    color: rgb(9, 30, 96);
    font-weight: 600;
    margin-bottom: 2vh;
    padding: 0 8%;
    font-size: initial;
}
#details{
    font-weight: 400;
}
.info{
    padding: 5% 8%;
}
.info .col-5{
    padding: 0;
}
#heading{
    color: grey;
    line-height: 6vh;
}
.pricing{
    background-color: #ddd3;
    padding: 2vh 8%;
    font-weight: 400;
    line-height: 2.5;
}
.pricing .col-3{
    padding: 0;
}
.total{
    padding: 2vh 8%;
    color: rgb(9, 30, 96);
    font-weight: bold;
}
.total .col-3{
    padding: 0;
}
  
</style>