<template>
    <div>
        <NavbarComponent/>
        <!-- <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary">Left</button>
            <button type="button" class="btn btn-secondary">Middle</button>
            <button type="button" class="btn btn-secondary">Right</button>
        </div> -->
        <button class = 'btn btn-primary' style = 'margin-right: 20px' @click = 'addVendor'>Add Vendor </button>
        <button class = 'btn btn-primary' @click = 'home'>Home</button>

         <div style = 'text-align: center;' v-if = 'present == 1'>
            <h2>No Orders Yet</h2>
        </div>
        <div v-if = 'present == 0'>
            <div class="card" style = 'margin-bottom: 30px;' v-for = 'vendor in vendors' :key='vendor.vendor_id'>
                <div class="card-header text-bg-info p-3">
                    Vendor Name - {{ vendor.vendor_id }} {{ vendor.vendor_name }}
                </div>
                <div class="card-body p-3 mb-2 bg-info-subtle text-emphasis-info" >
                    <h5 class="card-title">Phone - {{ vendor.phone }}, Email - {{ vendor.email }}</h5>
                    <p class="card-text"> Address - {{ vendor.address }} </p>
                    <router-link class = 'btn btn-primary' style = 'float: right;' :to = "{
                                name: 'vendor-specific',
                                params: {id : vendor.vendor_id }
                            }">Check Details </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import NavbarComponent from '../components/navbarComponent.vue';
    export default {
        name: 'VendorsList',
        components: {
            NavbarComponent
        },
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