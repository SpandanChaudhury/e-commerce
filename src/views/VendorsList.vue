<template>
    <div>
        <!-- <h2> this is the list of vendors </h2> -->
        <!-- <router-link to = '/addVendor'>Add vendor</router-link> -->
        <!-- <router-link to = '/product-list'>Home</router-link> -->
        <button @click = 'addVendor'>Add Vendor </button>
        <button @click = 'home'>Home</button>
        <div v-if = 'present == 1'>
            <h3>No vendors found</h3>
        </div>
        <div v-if = 'present == 0'>
            <h2>VENDORS' LIST</h2>
            <table>
                <thead>
                    <th>Vendor ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Details</th>
                </thead>
                <tbody>
                    <tr v-for = 'vendor in vendors' :key = 'vendor.vendor_id'>
                        <td> {{ vendor.vendor_id }} </td>
                        <td> {{ vendor.vendor_name }} </td>
                        <td> {{ vendor.phone }} </td>
                        <td> {{ vendor.email }} </td>
                        <td> {{ vendor.address }} </td>
                        <td>
                            <router-link :to = "{
                                name: 'vendor-specific',
                                params: {id : vendor.vendor_id }
                            }">Details</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'VendorsList',
        data: () => {
            return {
                vendors: [],
                present: 0
            }
        },
        methods: {
            addVendor()
            {
                this.$router.push('/addVendor')
            },
            home()
            {
                this.$router.push('/product-list');
            }
        },
        created()
        {
            const admin = JSON.parse(localStorage.getItem('admin'));
            if(admin == null)
                this.$router.push('/admin-login');
            const url = 'http://localhost:3300/vendors';
            axios.get(url)
            .then(response => {
                console.log(response);
                if(response.status == 203)
                    this.present = 1;
                else if(response.status == 200)
                    this.vendors = response.data;
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