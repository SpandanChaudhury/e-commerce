<template>
    <div>
        <h2>this is the check out page</h2>
        <button @click = 'confirmOrder()'>Confirm Order</button>
        <h2 v-if = 'success == 1' style = 'color:green'>Order Placed</h2>
        <h2 v-if = 'success == 2' style = 'color:red'>Order could not be placed, try again</h2>

    </div>
</template>

<script>
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    export default {
        name: 'CheckOut',
        data: () => {
            return {
                success: 0,
                user: {}
            }
        },
        methods: {
            confirmOrder()
            {
                const bill_amount = JSON.parse(localStorage.getItem('bill-amount'));
                const orders = JSON.parse(localStorage.getItem('orders'));
                const user_id = this.user.userid;
                var d = new Date();
                // console.log(d);
                var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
               
                const billData = {
                    bill_amount: bill_amount,
                    date: date,
                    user_id: user_id
                }
               
                console.log(date);
                // console.log(ordersData);
                console.log(billData);
                console.log(bill_amount);
                // console.log(orders);
                const url1 = 'http://localhost:3300/addOrders';
                const url2 = 'http://localhost:3300/addBill';
                
                axios.post(url2, billData)
                .then(response => {
                    console.log(response.data);
                    const ordersData = {
                        orders: orders,
                        user_id: user_id,
                        bill_id: response.data.bill_id
                    };
                    axios.post(url1, ordersData)
                    .then(response => {
                        console.log(response.data);
                        if(response.status == 200)
                        {
                            this.success = 1;
                            localStorage.removeItem('orders');
                            localStorage.removeItem('bill-amount');
                            localStorage.removeItem('cart');
                            setTimeout(() => {
                                this.$router.push('/')

                            }, 3000);
                        }
                            
                    })
                    .catch(error => {
                        console.log(error);
                        this.success = 2;
                    })
                })
                .catch(error => {
                    console.log(error);
                    this.success = 2;
                })
            }
        },
        created()
        {
            this.user = JSON.parse(localStorage.getItem('user'));
            if(this.user == null)
            {
                const router = useRouter();
                router.push('/login');
            }
        },
    }
</script>

<style scoped>

</style>