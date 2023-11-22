<template>
  <div class="m-0 sm:mx-2 md:mx-8 xxlmin:m-auto max-w-screen-xxlmin min-h-fullvh whitespace-normal break-words">
    <div
      class="flex flex-col min-h-fullvh firefox:bg-black firefox:bg-opacity-50 min-h-fullvh backdrop-filter backdrop-blur-sm"
    >
      <Header class="font-title font-medium text-steel" />
      <Nuxt />
      <TheFooter />
    </div>
    <Lightbox />
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
