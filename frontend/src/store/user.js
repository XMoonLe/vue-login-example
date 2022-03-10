import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const state = ref({
    username: '',
    email: '',
    authenticated: false,
  })

  const setUser = ({ username, email, authenticated }) => {
    state.value.username = username
    state.value.email = email
    state.value.authenticated = authenticated

    console.log(state.value)
  }

  return {
    state,
    setUser,
  }
})
