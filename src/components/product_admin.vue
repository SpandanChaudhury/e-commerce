<template>
    
        <!-- <h2>{{ product }}</h2>  -->
         <td> {{ product.product_id }} </td>
        <td> {{ product.product_name }} </td>
        <td> {{ product.price }} </td>
        <td> <a :href= url>Details</a> </td>

   
</template>

<script>
    export default {
        name: 'ProductAdmin',
        props: ['product'],
        data: () => {
            return {
                url: ''
            }
        },
        methods: {
            getImage(url)
            {
                return require('../assets/images/' + url);
            }
        },

        created()
        {
            this.url = 'http://localhost:8081/details/' + this.product.product_id;
        }
    }
</script>

<style scoped>
    td{
        border: 1px solid black;
    }
</style>