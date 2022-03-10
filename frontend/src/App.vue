<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <Component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&family=Raleway:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&display=swap');

:root {
  --background: #1b3a4b;
  --background-darken: #162e3b;
  --clr-primary: #ccdee8;
  --clr-secondary: #28536b;
  --clr-primary-shadow: #94a0a8;
  --clr-danger: #d0544e;
  --font-primary: 'Inter', sans-serif;
  --font-secondary: 'Raleway', sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body,
html {
  background: var(--background);
  color: var(--clr-primary);
  height: 100vh;
  font-family: var(--font-primary);
}

#app {
  height: 100%;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease-in-out;
}
</style>
