import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from "@/views/Auth";
import store from '@/store'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/')
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/auth')
}



const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/auth',
        component: Auth,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/about',
        name: 'About',
        beforeEnter: ifAuthenticated,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter(
    {
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
