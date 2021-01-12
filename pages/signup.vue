<template>
  <div>
    <h1>アカウント作成</h1>
    <v-form @submit="signUp">
      <v-text-field v-model="email" type="email" label="メール" />
      <v-text-field v-model="password" type="password" label="パスワード" />
      <v-text-field v-model="passwordConfirm" type="password" label="パスワード（確認用）" />
      <v-btn type="submit">
        アカウントを作成
      </v-btn>
    </v-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    ...mapActions('user', ['createUser']),
    signUp (event) {
      event.preventDefault()
      const user = {
        email: this.email,
        password: this.password
      }
      this.createUser(user)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>
