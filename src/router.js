import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'
import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home-page',
        component: HomePage
      },
      {
        path: '/login',
        name: 'login-page',
        component: LoginPage
      },
    ]
  });
  router.beforeEach((to, from, next) => {
    if ((to.path === '/login')) {
      if (store.state.user || localStorage.getItem('token')) {
        next({
          path: '/'
        });
      }
      else {
        next();
      }
    }
    else {
      if (store.state.user || localStorage.getItem('token')) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    }
  });

  export default router;
  