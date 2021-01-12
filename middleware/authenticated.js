import firebase from 'firebase'

const auth = async ({ store, route, redirect }) => {
  const user = await new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user)
    })
  })
  const routeNamesForAnonymous = [
    'login',
    'signup'
  ]
  if (!user && !routeNamesForAnonymous.includes(route.name)) {
    redirect('/login')
  }
  if (user && !store.getters['user/isAuthenticated']) {
    const { displayName, email } = user
    store.dispatch('user/setUserData', { displayName, email })
  }
  if (user && routeNamesForAnonymous.includes(route.name)) {
    redirect('/')
  }
}

export default auth
