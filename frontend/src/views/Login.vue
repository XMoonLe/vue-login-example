<script setup>
import { ref, onMounted } from 'vue'
import axios from '../lib/axios'
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'

const credentials = ref({
  username: '',
  email: '',
})
const error = ref('')
const loading = ref(false)
const form = ref(null)

const router = useRouter()
const store = useUserStore()

const login = async () => {
  error.value ? (error.value = '') : null
  loading.value = true

  try {
    const { data } = await axios.post('/auth/login', credentials.value)
    store.setUser({ ...data, authenticated: true })
    form.value.reset()
    router.replace('/')
  } catch (err) {
    console.log(err)

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
      <form ref="form" @submit.prevent="login">
        <div class="form-content">
          <div class="form-row">
            <label for="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              v-model="credentials.username"
            />
          </div>
          <div class="form-row">
            <label for="pass">Password</label>
            <input
              type="password"
              name="pass"
              id="pass"
              v-model="credentials.password"
            />
          </div>
          <p class="error" v-if="error">{{ error }}</p>
          <div class="form-row button">
            <button>
              <span v-if="loading">Loading...</span>
              <span v-else>Log in</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.container {
  background: var(--background-darken);
  padding: 20px;
  border-radius: 12px;
  width: 250px;
}

h1 {
  text-align: center;
  font-family: var(--font-secondary);
  font-weight: 400;
  font-style: italic;
  font-size: clamp(1.1rem, 4vw, 1.8rem);
}

.form-content {
  display: grid;
  margin-top: 20px;
  gap: 20px;
}

.form-row {
  display: flex;
  flex-direction: column;
}

.error {
  color: var(--clr-danger);
  font-size: 0.8rem;
  text-align: center;
}

label {
  font-size: 0.9rem;
  margin-bottom: 10px;
}

input {
  padding: 6px;
  outline: none;
  background: var(--clr-secondary);
  border-radius: 5px;
  color: var(--clr-primary);
  border: none;
  transition: box-shadow 0.3s;
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
}

button:active {
  transform: scale(0.90);
}
</style>
