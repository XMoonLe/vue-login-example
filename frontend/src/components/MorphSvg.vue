<template>
  <svg
    id="visual"
    viewBox="0 0 220 200"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
  >
    <g transform="translate(107.75649290932422 102.06767170622794)">
      <path
        id="blob1"
        d="M68 -42.1C81.8 -15.3 82.5 16.4 69 41.4C55.4 66.3 27.7 84.7 -4.2 87.1C-36.1 89.5 -72.2 76 -86.6 50.5C-101 25 -93.8 -12.5 -75.8 -41.7C-57.7 -71 -28.9 -92 -0.9 -91.5C27.1 -91 54.1 -68.9 68 -42.1"
        fill="var(--background-darken)"
      ></path>
    </g>

    <g
      transform="translate(96.30031623183785 100.02277959166084)"
      style="visibility: hidden"
    >
      <path
        id="blob2"
        d="M87.5 -48.5C104.5 -21 103.3 19 85.7 47.5C68.1 76 34.1 93 3.5 91C-27.1 89 -54.1 67.9 -72.2 39.2C-90.2 10.4 -99.2 -26 -85.7 -51.5C-72.2 -77 -36.1 -91.5 -0.4 -91.2C35.2 -91 70.4 -76 87.5 -48.5"
        fill="var(--background-darken)"
      ></path>
    </g>
  </svg>
</template>

<script setup>
import KUTE from 'kute.js'
import { onMounted } from 'vue'

onMounted(() => {
  KUTE.fromTo(
    '#blob1',
    { path: '#blob1' },
    { path: '#blob2' },
    { repeat: 999, duration: 20000, yoyo: true }
  ).start()
})
</script>

<style scoped>
#visual {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 440px;
  z-index: -1;
}
</style>
