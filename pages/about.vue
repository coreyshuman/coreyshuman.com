<template>
  <div class="text-steel">About</div>
</template>
<script>
export default {
  mounted() {
    console.log('create!!!!!!@@@@@@@')
    this.$root.$emit('updateConstellation', {
      pointDensity: 30,
      attractRange: [0, 500],
      attractForce: [5000,6000],
      repelRange: [0, 500],
      repelForce: [7000, 9000],
      maxLineLength: 300,
      backgroundColor: "#ffffff",
      pointColor: "#ff9300",
      lineColor: "#9437ff"
      });
  }
}
</script>
