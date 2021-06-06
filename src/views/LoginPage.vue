<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" xs="2" sm="7" md="5" lg="4" xl="2">
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from "../components/LoginForm";

export default {
  name: "login-page",
  components: {
    LoginForm
  }
};
</script>
