<script setup>
  import useUserStore from '../store/user'
  const userStore = useUserStore()

</script>

<template>
  <main class="home-container">
    <h1>Welcome, {{userStore.state.username}}</h1>
    <p>You just logged in.</p>
  </main>
</template>

<style scoped>
  .home-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: var(--font-secondary);
    gap: 20px;
  }

  h1 {
    font-weight: 400;
    font-style: italic;
  }
</style>