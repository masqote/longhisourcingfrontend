import App from './App.vue'
import Vue from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// import the plugin
import DateRangePicker from "@gravitano/vue-date-range-picker"
 
Vue.config.productionTip = false;
 
// use the plugin
Vue.use(DateRangePicker);

import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

import HomeComponent from './components/HomeComponent.vue'
import CreateComponent from './components/CreateComponent.vue'
import IndexComponent from './components/IndexComponent.vue'
import EditComponent from './components/EditComponent.vue'
import LoginComponent from './components/LoginComponent.vue'

Vue.config.productionTip = false

const routes = [
  {
      name: 'login',
      path: '/login',
      component: LoginComponent
  },
  {
      name: 'home',
      path: '/',
      component: HomeComponent
  },
  {
      name: 'create',
      path: '/create',
      component: CreateComponent
  },
  {
      name: 'posts',
      path: '/posts',
      component: IndexComponent
  },
  {
      name: 'edit',
      path: '/edit/:id',
      component: EditComponent
  }
]

const router = new VueRouter({ mode: 'history', routes: routes})
new Vue(Vue.util.extend({ router }, App)).$mount('#app')

