<template>
    <div>
        <h3>Total Orders</h3>
        <router-link to = '/users'>Back</router-link>
        <div v-if = 'present == 0'>
            <h2>No Orders Yet</h2>
        </div>
        <div v-if = 'present == 1'>
            <table>
                <thead>
                    <tr>
                        <th>Bill ID</th>
                        <th>Bill Amount</th>
                        <th>Bill Date</th>
                        <!-- <th>Details</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for = 'bill in bills' :key='bill.bill_id'>
                        <td> {{ bill.bill_id }} </td>
                        <td> {{ bill.bill_amount }} </td>
                        <td> {{ bill.bill_date.substr(0, 8) + (parseInt(bill.bill_date.substr(8, 11)) + 1)  }} </td>
                        <!-- <td>
                            <router-link :to = "{name: 'order-details', params: {id: bill.bill_id }}">Check Details </router-link>
                        </td> -->
                    </tr>
                </tbody>
            </table>
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