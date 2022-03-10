import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', () => {
  const state = ref({
    username: '',
    email: '',
    authenticated: false,
  })

  const setUser = ({ username, email, authenticated }) => {
    state.value.username = username
    state.value.email = email
    state.value.authenticated = authenticated
  }

  return {
    state,
    setUser,
  }
})

export default useUserStore
