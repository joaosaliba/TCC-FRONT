import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import ViewAfterLogin from "@/ViewAfterLogin.vue"
import Router from "@/router/router.js"


Vue.use(VueRouter)

const routes = [
 
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  
  {
    path: "/",
    component: ViewAfterLogin,
    children: [ //colocar outras rotas aqui
      {
        path: "",
        children: Router,
      },
  
  ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
