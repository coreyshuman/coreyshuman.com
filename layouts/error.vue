<template>
  <div class="text-steel flex justify-center mt-12">
    <h1 v-if="error.statusCode === 404" class="text-title font-bold text-4xl">Page Not Found</h1>
    <h1 v-else class="text-title font-bold text-4xl">An Error Occurred</h1>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }},
  mounted() {
    this.$root.$emit('updateConstellation', {
      pointDensity: 20,
      pointSize: 3,
      friction: .015,
      frictionMinVelocity: .25,
      attractDistanceRange: [10, 150],
      attractForceRange: [.04, .01],
      repelDistanceRange: [0, 80],
      repelForceRange: [.08, .02],
      maxLineLength: 20,
      lineSize: 1,
      screenBlur: .6,
      maxInteractDistance: 60,
      maxInteractForce: .62,
      interactMode: "attract",
      backgroundColor: "#8b0000",
      pointColor: "#ff5733",
      lineColor: "#ffd700",
      pointInteractColor: "#ffcc33",
    });
  }
};
</script>
