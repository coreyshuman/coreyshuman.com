<template>
  <div class="m-8 xxlmin:m-auto max-w-screen-xxlmin min-h-fullvh">
    <div class="firefox:bg-black firefox:bg-opacity-50 min-h-fullvh backdrop-filter backdrop-blur-sm">
      <TheHeader />
      <Nuxt class="pb-40" />
      <TheFooter class="absolute bottom-0 w-full h-40" />
    </div>
    <ConstellationBackground :config="constellationConfig" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      constellationConfig: {
      }
    }
  },
  created() {
    this.$root.$on('updateConstellation', (config) => {
      this.constellationConfig = {...config}
    })
  }
};
</script>

<style>
html {
  font-family: Montserrat, Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background-color: black;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
