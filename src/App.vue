<template>
  <v-app id="app">
    <v-app-bar app color="white" dark height="80vh">
      <div class="d-flex align-center">
        <v-img
          alt="Ecosafety Logo"
          class="shrink ml-3 mr-3"
          contain
          src="./assets/ecosafety-logo.jpg"
          transition="scale-transition"
          width="35"
        />
      </div>

      <div class="title-wrapper">
        <v-toolbar-title class="app-bar-title" style="line-height: 1.1rem;">ЭКО</v-toolbar-title>
        <v-toolbar-title class="app-bar-title" style="margin-left: 10px; font-size: 0.9rem;">БЕЗОПАСНОСТЬ</v-toolbar-title>
        <v-toolbar-title class="app-bar-title" style="font-size: 0.7rem; font-weight: bold;">ГРУППА КОМПАНИЙ</v-toolbar-title>
      </div>
      
      <v-spacer></v-spacer>

      <div v-show="pid">
        <v-toolbar-title class="app-bar-title mr-5" 
        style="font-size: 1rem;">
          Ваш логин: {{ pid }}
        </v-toolbar-title>
      </div>
       
      <v-btn v-show="token" icon color="#004C84" class="mr-4" v-on:click="$store.dispatch('onLogout')">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-content class="d-flex align-center">
        <router-view />
      </v-content>
    </v-main>
  </v-app>
</template>

<script>
import { eventBus } from './main'

export default {
  name: 'App',
  data() {
    return {
      token: '',
      pid: ''
    }
  },
  created() {
    eventBus.$on('login', data => {
      this.token = data.token;
      this.pid = data.pid;
    })
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.pid = localStorage.getItem('pid');
  }
};
</script>

<style>
.app-bar-title {
  color: #004C84;
}
.v-toolbar__content {
  height: 0;
}
#app {
  background-color: #EEEEED;
}
</style>
