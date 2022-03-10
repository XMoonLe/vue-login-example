<script setup>
import { ref } from 'vue'
import axios from '../lib/axios'
import useUserStore from '../store/user'
import { useRouter } from 'vue-router'
// components
import Preloader from '../components/Preloader.vue'
import MorphSvg from '../components/MorphSvg.vue'

// necessary variables
const credentials = ref({
  username: '',
  email: '',
})
const error = ref('')
const loading = ref(false)

const router = useRouter()
const userStore = useUserStore()

// submit data
const login = async () => {
  error.value ? (error.value = '') : null
  loading.value = true

  try {
    const { data } = await axios.post('/auth/login', credentials.value)
    userStore.setUser({ ...data, authenticated: true })
    router.replace({ name: 'Home' })
    credentials.value = {}
  } catch (err) {
    console.error(err)
    const message = err?.response?.data?.message
    !message
      ? (error.value = 'Something went really bad')
      : (error.value = message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="login-body">
    <div class="container" aria-label="Login Form">
      <h1>Log in</h1>
      <form @submit.prevent="login">
        <div class="form-row">
          <div class="input-wrapper">
            <input
              type="text"
              name="username"
              id="username"
              v-model="credentials.username"
              required
            />
            <label for="username" aria-hidden="true">Username</label>
          </div>
        </div>
        <div class="form-row">
          <div class="input-wrapper">
            <input
              type="password"
              name="pass"
              id="pass"
              v-model="credentials.password"
              required
            />
            <label for="pass" aria-hidden="true">Password</label>
          </div>
        </div>
        <div class="form-row button">
          <p class="error" v-if="error">{{ error }}</p>
          <button :disabled="loading">
            <Preloader v-if="loading" />
            <span v-else>Log in</span>
          </button>
        </div>
      </form>
      <MorphSvg />
    </div>
  </main>
</template>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
}

.container {
  padding: 20px;
  border-radius: 12px;
  width: 250px;
  position: relative;
  z-index: 10;
}

h1 {
  text-align: center;
  font-family: var(--font-secondary);
  font-weight: 400;
  font-style: italic;
  font-size: clamp(1.6rem, 4vw, 1.8rem);
}

form {
  display: grid;
  margin-top: 40px;
  gap: 40px;
}

.form-row {
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-wrapper:focus-within label {
  transform: translateY(-40px) translateX(-10px);
  color: var(--clr-primary);
}

.error {
  color: var(--clr-danger);
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 10px;
}

label {
  font-size: 0.8rem;
  margin-bottom: 10px;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--clr-primary-shadow);
  pointer-events: none;
  transition: 0.3s;
}

input {
  padding: 6px;
  width: 100%;
  outline: none;
  background: var(--clr-secondary);
  border-radius: 5px;
  color: var(--clr-primary);
  border: none;
  transition: box-shadow 0.3s;
}

input:valid ~ label {
  transform: translateY(-40px) translateX(-10px);
  color: var(--clr-primary);
}

input:focus-visible {
  box-shadow: 0 0 0 3px var(--clr-primary);
}

button {
  width: max-content;
  margin: auto;
  padding: 0.5em 0.7em;
  cursor: pointer;
  background: var(--clr-primary);
  border-radius: 5px;
  border: none;
  transition: 0.3s;
  font-family: inherit;
  outline: none;
}

button:focus-visible {
  transform: scale(1.07);
}

button:active {
  transform: scale(0.9);
}

button:disabled {
  background: var(--clr-primary-shadow);
  cursor: initial;
}
</style>
