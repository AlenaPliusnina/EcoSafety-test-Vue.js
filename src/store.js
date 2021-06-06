import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import { eventBus } from './main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null || localStorage.getItem('token'),
  },
  mutations: {
    setLocalStorage(state, payload) {
      state.user = payload;
      localStorage.setItem('token', payload.TK);
      localStorage.setItem('pid', payload.id_login);
      eventBus.$emit('login', {
        token: localStorage.getItem('token'),
        pid: localStorage.getItem('pid')
      });
      router.push('/');
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('pid');
      localStorage.removeItem('md5');
      // window.location.reload();
      router.push('/login');
    }
  },
  actions: {
    onLogin({ commit }, payload) {
      console.log(payload)
      axios.get(`https://host1.medsafe.tech:40443/api/client_login?json={"login":"${payload.login}","password":"${payload.password}","IMEI":"${payload.md5}"}`)
        .then(res => {
          const data = res.data[0];
          if (data.id_login !== 0) {
            localStorage.setItem('md5', payload.md5);
            commit('setLocalStorage', data);
          } else {
            alert('Неверный логин или пароль.')
          }      
        })
        .catch((e) => {
          console.log(e.response.data);
        })
      },
      onLogout({commit}) {
        commit('logout');
      }
    }
})