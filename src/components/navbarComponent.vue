<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <!-- <div class="container-fluid"> -->
    <a class="navbar-brand" href="#">E-Commerce</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/viewcart">View Cart</a>
        </li>
        <li class="nav-item" v-if = 'logged == 10'>
          <a class="nav-link" href="/login" >Login</a>
        </li>
        <li class="nav-item" v-if = 'logged == 2'>
          <a class="nav-link" href="" @click = 'logout' >LogOut</a>
        </li>
        <li class="nav-item" v-if = 'logged == 2'>
          <a class="nav-link" href="/orders" >View Orders</a>
        </li>
      </ul>
       <div class="d-flex" v-if = 'logged == 2'>
        <h5>Welcome {{ user.first_name }} {{ user.last_name }} </h5>
      </div>
    </div>
  <!-- </div> -->
</nav>
</template>

<script>
    export default {
        name: 'NavbarComponent',
        data: () => {
            return {
                logged: 10,
                admin: {},
                user: {}
            }
        },

        methods: {
            logout()
            {
                localStorage.removeItem('user');
                localStorage.removeItem('cart');
                localStorage.removeItem('bill-amount');
                localStorage.removeItem('orders');
                localStorage.removeItem('products');
                this.logged = 1;
                location.reload();
            },
        },
        created()
        {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.admin = JSON.parse(localStorage.getItem('admin'));
            if(this.user != null && this.admin != null)
            {
                this.logged = 2;
            }
            else if(this.user == null && this.admin == null)
            {
                this.logged = 10;
            }
            else if(this.user == null)
            {
                this.logged = 1;
            }
            else if(this.admin == null)
            {
                this.logged = 2;
            }
        }
    }
</script>

<style scoped>

</style>