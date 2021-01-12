import firebase from '@/plugins/firebase'

const firebaseLogin = (user) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        const { displayName, email } = data.user
        resolve({ displayName, email })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const firebaseLogout = (user) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const firebaseCreateUser = (user) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const state = () => ({
  userDate: null
})

export const getters = {
  isAuthenticated (state) {
    return !!state.userData
  },
  getUserData (state) {
    return state.userData
  }
}

export const mutations = {
  setUser (state, payload) {
    state.userData = payload
  }
}

export const actions = {
  async login ({ commit }, user) {
    try {
      const loginResult = await firebaseLogin(user)
      commit('setUser', loginResult)
      return
    } catch (e) {
      throw new Error(e)
    }
  },
  async logout ({ commit }) {
    try {
      await firebaseLogout()
      return
    } catch (e) {
      throw new Error(e)
    }
  },
  async createUser ({ commit }, user) {
    try {
      await firebaseCreateUser(user)
      const resultLogin = await firebaseLogin(user)
      commit('setUser', null)
      return resultLogin
    } catch (e) {
      throw new Error(e)
    }
  },
  setUserData ({ commit }, user) {
    commit('setUser', user)
  }
}
