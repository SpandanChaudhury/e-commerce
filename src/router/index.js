import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetails from '../views/ProductDetails.vue';
import AddProduct from '../views/AddProduct.vue';
import ViewCart from '../views/ViewCart.vue';
import CheckOut from '../views/CheckOut.vue';
import UserLogin from '../views/UserLogin.vue';
import UserSignUp from '../views/UserSignUp.vue';
import AdminLogin from '../views/AdminLogin.vue';
import ProductsList from '../views/ProductsList.vue';
import EditProduct from '../views/EditProduct.vue';
import ViewOrders from '../views/ViewOrders.vue';
import UserList from '../views/UsersList.vue';
import VendorsList from '../views/VendorsList.vue';
import AddVendor from '../views/AddVendor.vue';
import VendorView from '../views/VendorView.vue';
import OrderDetails from '../views/OrderDetails.vue';
import ViewOrdersAdmin from '../views/ViewOrdersAdmin.vue';
import SliderTrial from '../views/slidertrial.vue';
import NavbarComponent from '../views/Navbar.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminLogin.vue')
  },
  {
    path: '/details/:id',
    name: 'productdetails',
    component: ProductDetails,
    props: true
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    component: AddProduct

  },
  {
    path: '/viewCart',
    name: 'ViewCart',
    component: ViewCart
  },
  {
    path: '/checkOut',
    name: 'CheckOut',
    component: CheckOut
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/signup',
    name: 'User-Signup',
    component: UserSignUp
  },
  {
    path: '/admin-login',
    name: 'Admin Login',
    component: AdminLogin
  },
  {
    path: '/product-list',
    name: 'Product-List',
    component: ProductsList
  },
  {
    path: '/editProduct/:id',
    name: 'Edit-Product',
    component: EditProduct
  },
  {
    path: '/orders',
    name: 'view-orders',
    component: ViewOrders
  },
  {
    path: '/users',
    name: 'user-list',
    component: UserList
  },
  {
    path: '/vendors',
    name: 'Vendors-List',
    component: VendorsList
  },
  {
    path: '/addVendor',
    name: 'Add-Vendor',
    component: AddVendor
  },
  {
    path: '/vendors/:id',
    name: 'vendor-specific',
    component: VendorView
  },
  {
    path: '/orders/:id',
    name: 'order-details',
    component: OrderDetails
  },
  {
    path: '/orders-admin/:id',
    name: 'orders-admin',
    component: ViewOrdersAdmin
  },
  {
    path: '/slider',
    name: 'slider-trial',
    component: SliderTrial
  },
  {
    path: '/navbar',
    name: 'Navbar',
    component: NavbarComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
