<template>
  <div class="text-steel">
    <h1 class="text-title font-bold text-4xl">Page Not Found</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$root.$emit('updateConstellation', {
        // pointDensity: 30,
        attractRange: [10, 120],
        attractForce: [.02, .03],
        repelRange: [0, 80],
        repelForce: [.02, .06],
        maxLineLength: 20,
        backgroundColor: "#8b0000",
        pointColor: "#ff5733",
        lineColor: "#ffd700"
    });
  }
};
</script>
