<template>
  <div class="text-steel">Projects</div>
</template>
<script>
export default {
  mounted() {
    this.$root.$emit('updateConstellation', {
      pointDensity: 60,
      attractRange: [0, 0],
      attractForce: [0, 0],
      repelRange: [0, 70],
      repelForce: [.4, .6],
      maxLineLength: 0,
      backgroundColor: "#cccccc",
      pointColor: "#ffffff",
      lineColor: "#000000"
    });
  }
}
</script>
