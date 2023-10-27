<template>
  <div class="block w-full h-3px separatorBackground"></div>
</template>

<script>
export default {
  props: {},
  mounted() {
    document.addEventListener('mousemove', this.updateMousePosition);
    // window.addEventListener('resize', this.handleResize);
    this.updateMousePosition({clientX: 0, clientY: 0});
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.updateMousePosition);
    // window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    updateMousePosition(e) {
      const {x, y} = this.$el.getBoundingClientRect();
      this.$el.style.setProperty("--x", `${e.clientX - x}px`);
      this.$el.style.setProperty("--y", `${e.clientY - y}px`);
    }
  }

};
</script>
<style scoped>
.separatorBackground {
  background: radial-gradient(250px circle at var(--x) var(--y), var(--color-teal) 0, var(--color-gray));
}
</style>
