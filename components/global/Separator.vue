<template>
  <div class="block w-full h-3px border-gray separatorBackground" :class="{'border-b-2': !mounted}"></div>
</template>

<script>
export default {
  data() {
    return {
      mounted: false,
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.updateMousePosition);
    document.addEventListener('touchstart', this.updateMousePosition);
    document.addEventListener('touchmove', this.updateMousePosition);
    this.updateMousePosition({clientX: 0, clientY: 0});
    this.mounted = true;
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.updateMousePosition);
    document.removeEventListener('touchstart', this.updateMousePosition);
    document.removeEventListener('touchmove', this.updateMousePosition);
  },
  methods: {
    updateMousePosition(e) {
      const {x, y} = this.$el.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;
      if(e.changedTouches) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else if(e.clientX) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      this.$el.style.setProperty("--x", `${clientX - x}px`);
      this.$el.style.setProperty("--y", `${clientY - y}px`);
    }
  }

};
</script>
<style scoped>
.separatorBackground {
  background: radial-gradient(250px circle at var(--x) var(--y), var(--color-celeste) 0, var(--color-gray));
}
</style>
