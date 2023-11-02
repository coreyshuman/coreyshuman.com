<template>
  <div class="text-steel flex justify-center mt-12">
    <h1 v-if="error.statusCode === 404" class="text-title font-bold text-4xl">Page Not Found</h1>
    <h1 v-else class="text-title font-bold text-4xl">An Error Occurred</h1>
  </div>
</template>

<script>
import { util } from '~/util/util';

export default {
  mixins:[util],
  props: {
    error: {
      type: Object,
      required: true
    }},
  mounted() {
    const setting = {
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
      backgroundColor: "#780000",
      pointColor: "#ff6a4b",
      lineColor: "#ffd700",
      pointInteractColor: "#ffcc33",
    };

    if(this.canvasSupportsDisplayP3() && this.canvasSupportsWideGamutCSSColors()) {
      setting.backgroundColor = 'oklch(35.89% 0.1643 29.23)';
      setting.lineColor = 'oklch(88.68% 0.182 95.33)';
      setting.pointColor = 'oklch(70.59% 0.237 33.69163741550973)';
      setting.pointInteractColor = 'oklch(86.66% 0.2013 88.68371543063601)';
    }

    this.$root.$emit('updateConstellation', setting);
  }
};
</script>
