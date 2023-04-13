<template>
    <div>
        <router-link to = '/vendors'>Vendor List</router-link>
        <h2>Add Vendor</h2>
        <form @submit.prevent>
            <label for="Vendor Name">Vendor Name</label>
            <input type="text" placeholder = 'Vendor Name' v-model = 'name'>
            <br><br>
            <label for="Phone">Phone</label>
            <input type="text" placeholder = 'Phone' v-model = 'phone'>
            <br><br>
            <label for="Email">Email</label>
            <input type="email" placeholder = 'Vendor Email' v-model = 'email'>
            <br><br>
            <label for="Address">Vendor's Address</label><br>
            <!-- <input type="text" placeholder = 'Vendor Address' v-model = 'address'> -->
            <textarea name="" id="" cols="30" rows="10" placeholder = 'Vendor Address' v-model = 'address'></textarea>
            <br><br>
            <button @click = 'submit'>Add Vendor</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'AddVendor',
        data: () => {
            return {
                name: '',
                email: '',
                phone: '',
                address: ''
            }
        },
        methods: {
            submit()
            {
                const url = 'http://localhost:3300/addVendor';
                const data = {
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    address: this.address
                };
                axios.post(url, data)
                .then(response => {
                    console.log(response.data);
                    if(response.status == 200)
                        this.$router.push('/vendors');
                })
                .catch(error => {
                    console.log(error);
                })
            }

        },
        created()
        {
            const admin = JSON.parse(localStorage.getItem('admin'));
            if(admin == null)
                this.$router.push('/admin-login');
        }
    }
</script>

<style scoped>

</style>