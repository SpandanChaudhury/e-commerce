<template>
    <div>
        <!-- <h3>Users' list</h3> -->
        <router-link to = '/product-list'>Back</router-link>

            <!-- <tbody>
                <tr v-for = 'user in users' :key = 'user.user_id'>
                    <td> {{ user.userid }} </td>
                    <td> {{ user.first_name }} {{ user.last_name }} </td>
                    <td> {{ user.phone }} </td>

                    <td> {{ user.email }} </td>
                    <td> {{ user.address }} </td>
                    <td>
                        <router-link :to = "{name: 'orders-admin', params: { id: user.userid }}">View Orders</router-link>
                    </td>
                </tr>
            </tbody>
        </table> -->
        <div style = 'text-align: center;' v-if = 'present == 1'>
            <h2>No Orders Yet</h2>
        </div>
        <div v-if = 'present == 0'>
            <div class="card" style = 'margin-bottom: 30px;' v-for = 'user in users' :key='user.userid'>
                <div class="card-header text-bg-info p-3">
                    User - {{ user.userid }} . {{ user.first_name }}  {{ user.last_name }}
                </div>
                <div class="card-body p-3 mb-2 bg-info-subtle text-emphasis-info" >
                    <h5 class="card-title">Phone - {{ user.phone }}, Email - {{ user.email }}</h5>
                    <p class="card-text"> Address - {{ user.address }} </p>
                    <router-link class = 'btn btn-primary' style = 'float: right;' :to = "{name: 'orders-admin', params: { id: user.userid }}">Check Details </router-link>
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'UserList',
        data: () => {
            return {
                users: {},
                present: 0
            }
        },
        created(){
            const admin = JSON.parse(localStorage.getItem('admin'));
            if(admin == null)
                this.$router.push('/admin-login');
            const url = 'http://localhost:3300/users';
            axios.get(url)
            .then(response => {
                console.log(response.data);
                if(response.status == 203)
                {
                    this.present = 1;
                }
                else if(response.status == 200)
                {
                    this.present = 0;
                    this.users = response.data;
                }
                // console.log(this.users);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
</script>

<style scoped>
    table, thead, tbody, td, tr, th {
        border: 1px solid black;
    }
</style>