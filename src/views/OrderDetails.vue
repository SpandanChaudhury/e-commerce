<template>
    <div>
        <h2>this is the order details page.</h2>
        <router-link to = '/orders'>Back</router-link>
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
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'OrderDetails',
        data: () => {
            return {
                id: '',
                orders: []
            }
        },
        created()
        {
            const user = JSON.parse(localStorage.getItem('user'));
            if(user == null)
                this.$route.push('/login');
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
</style>