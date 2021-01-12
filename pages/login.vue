<template>
  <v-form @submit="signIn">
    <v-text-field v-model="email" label="メール" type="email" />
    <v-text-field v-model="password" label="パスワード" type="password" />
    <v-btn type="submit" class="ma-2" outlined color="indigo">
      Outlined Button
    </v-btn>
    {{ email }}/{{ password }}
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    signIn (event) {
      event.preventDefault()
      const user = {
        email: this.email,
        password: this.password
      }
      this.login(user)
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
