import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import ViewAfterLogin from "@/ViewAfterLogin.vue"
import Router from "@/router/router.js"
import store from '@/utils/store.js'
import CadastroUsuario from "../views/CadastroUsuario.vue";



Vue.use(VueRouter)

const routes = [
 
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: "/novoUsuario",
    name: "CadastroUsuario",
    component: CadastroUsuario,
  },
  
  {
    path: "/",
    component: ViewAfterLogin,
    children: [ //colocar outras rotas aqui
      {
        path: "",
        children: Router,
        meta: {
          requiresAuth: true
        }
      },
  
  ]
  }
]


const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log(store.getters.isLogged)
    if (!store.getters.isLogged) {
      next({ path: '/login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})



export default router
