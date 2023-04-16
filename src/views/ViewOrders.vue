<template>
    <div>
        <h3>Find Your Orders</h3>
        <router-link to = '/'>Home</router-link>
        <div style = 'text-align: center;' v-if = 'present == 0'>
            <h2>No Orders Yet</h2>
        </div>
        <div v-if = 'present == 1'>
            <div class="card" style = 'margin-bottom: 30px;' v-for = 'bill in bills' :key='bill.bill_id'>
                <div class="card-header text-bg-info p-3">
                    Bill ID - {{ bill.bill_id}}
                </div>
                <div class="card-body p-3 mb-2 bg-info-subtle text-emphasis-info" >
                    <h5 class="card-title">Bill Amount - RS. {{ bill.bill_amount }}</h5>
                    <p class="card-text">Order Date - {{ bill.bill_date.substr(0, 8) + (parseInt(bill.bill_date.substr(8, 11)) + 1)  }} </p>
                    <router-link class = 'btn btn-primary' style = 'float: right;' :to = "{name: 'order-details', params: {id: bill.bill_id }}">Check Details </router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    export default {
        name: 'ViewOrders',
        data: () => {
            return {
                user: {},
                bills: [],
                present: 0
            }
        },
        created()
        {
            this.user = JSON.parse(localStorage.getItem('user'));
            if(this.user == null)
                this.$router.push('/login');
            const url = 'http://localhost:3300/bills/' + this.user.userid;
            axios.get(url)
            .then(response => {
                console.log(response.data);
                if(response.status == 203)
                {
                    this.present = 0;
                }
                else if(response.status == 200)
                {
                    this.present = 1;
                    this.bills = response.data;
                    console.log(this.bills);
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
</script>

<style scoped>

</style>