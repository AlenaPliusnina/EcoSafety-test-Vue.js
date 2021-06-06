<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card style="padding: 50px">
      <h2 class="login-form-title">Вход в личный кабинет</h2>
      <p class="login-form-subtitle">* Используйте логин и пароль из памятки</p>
      <div class="login-form-inputs">
          <v-text-field
            v-model="login"
            type="text"
            :rules="loginRules"
            label="Логин"
            required
        ></v-text-field>
        <v-text-field
            v-model="password"
            type="password"
            :rules="passwordRules"
            label="Пароль"
            required
        ></v-text-field>
      </div>
      <v-row class="d-flex justify-space-between">
        <v-btn @click="validate" style="margin-left: 10px;" color="#005B9C" dark>Войти</v-btn>
      </v-row>
    </v-card>
  </v-form>
</template>

<script>
import FingerprintJS from '@fingerprintjs/fingerprintjs'

export default {
  name: "login-form",
  data() {
    return {
      valid: true,
      login: "",
      password: "",
      md5: "",
      loginRules: [v => !!v || "Обязательное поле."],
      passwordRules: [v => !!v || "Обязательное поле."]
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const payload = {
          login: this.login,
          password: this.password,
          md5: this.md5
        };
        this.$store.dispatch("onLogin", payload);
      } 
    }
  },
  mounted() {
    const fpPromise = FingerprintJS.load();
    (async () => {
      const fp = await fpPromise;
      const result = await fp.get();

      this.md5 = result.visitorId;
    })()
  }
}
</script>

<style>
.login-form-title {
    text-align: center;
}

.login-form-subtitle {
    text-align: center;
    color: #004C84;
    font-size: 0.8rem;
} 

.login-form-inputs {
    margin-bottom: 30px;;
}

</style>