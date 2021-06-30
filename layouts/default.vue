<template>
  <div>
    <Nuxt />
    <div id="canvasdiv">
      <div id="fps"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    const externalScript = document.createElement('script')
    externalScript.setAttribute('src', 'js/constellation.js')
    document.head.appendChild(externalScript)
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

canvas {
  display: block;
}

#canvasdiv {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
}

#fps {
  position: fixed;
  top: 10;
  left: 10;
  width: 50;
  height: 20;
  color: white;
}
</style>
