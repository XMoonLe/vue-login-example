import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from './store/user'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/Login.vue'),
    meta: { auth: false },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue'),
    meta: { auth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const authRequired = to.meta.auth
  const authenticated = userStore.state.authenticated

  // Checking is the user is authenticated
  authRequired && !authenticated
    ? next('/login')
    : !authRequired && authenticated
    ? next('/')
    : next()
})

export default router
