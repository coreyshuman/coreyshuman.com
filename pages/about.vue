<template>
  <div class="text-steel">About</div>
</template>
<script>
export default {
  mounted() {
    this.$root.$emit('updateConstellation', {
      pointDensity: 16,
      pointSize: 3,
      friction: .0675,
      frictionMinVelocity: .3300,
      attractDistanceRange: [0, 75],
      attractForceRange: [0, .1024],
      repelDistanceRange: [0, 90],
      repelForceRange: [.41, .14],
      maxLineLength: 90,
      lineSize: 1,
      screenBlur: .30,
      maxInteractDistance: 450,
      maxInteractForce: .1500,
      interactMode: "attract",
      backgroundColor: "#254e70",
      pointColor: "#254e70",
      lineColor: "#8ee3ef",
      pointInteractColor: "#254e70",
      });
  }
}
</script>
