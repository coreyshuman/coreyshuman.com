<template>
  <div class="m-0 sm:mx-2 md:mx-8 xxlmin:m-auto max-w-screen-xxlmin min-h-fullvh whitespace-normal break-words">
    <div
      ref="mainContent"
      class="flex flex-col min-h-fullvh firefox:bg-black firefox:bg-opacity-50 min-h-fullvh backdrop-filter backdrop-blur-sm"
      :aria-hidden="ariaHidden"
    >
      <Header class="font-title font-medium text-steel" />
      <Nuxt />
      <TheFooter />
    </div>
    <Lightbox @show="lightboxShow" />
    <ConstellationBackground />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      ariaHidden: false
    }
  },
  methods: {
    lightboxShow(show) {
      this.ariaHidden = show;
    }
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
