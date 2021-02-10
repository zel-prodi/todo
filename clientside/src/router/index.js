import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      isPublic: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      isPublic: false
    }
  },
  {
    path: '/crud',
    name: 'Crud',
    component: () => import('../views/Crud.vue'),
    meta: {
      isPublic: false
    }
  },
  {
    path: '/sealant',
    name: 'Sealant',
    component: () => import('../views/Sealant.vue'),
    meta: {
      isPublic: false
    }
  },
  {
    path: '/computation',
    name: 'Computation',
    component: () => import('../views/Computation.vue'),
    meta: {
      isPublic: false
    }
  },
  {
    path: '/*',
    name: 'Page404',
    component: () => import('../views/Page404.vue'),
    meta: {
      isPublic: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(
      page => page.meta.isPublic 
      || store.state.userInfo.employeeCode
    )) {
    next()
  }else{
    next('/login')
  }
})

export default router
