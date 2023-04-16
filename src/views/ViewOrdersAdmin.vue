<template>
    <div>
        <!-- <h3>Total Orders</h3> -->
        <router-link to = '/users'>Back</router-link>
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
        name: 'ViewOrdersAdmin',
        data: () => {
            return {
                admin: {},
                bills: [],
                present: 0,
                userid: ''
            }
        },
        created()
        {
            this.admin = JSON.parse(localStorage.getItem('admin'));
            if(this.admin == null)
                this.$router.push('/login-admin');
            this.userid = this.$route.params.id;
            const url = 'http://localhost:3300/bills/' + this.userid;
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
    table, tbody, thead, th, td{
        border: 1px solid black;
    }
</style>