<template>
  <div class="text-steel">About</div>
</template>
<script>
import { util } from '~/util/util';

export default {
  mixins:[util],
  mounted() {
    const setting = {
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
      backgroundColor: "#00142d",
      pointColor: "#00142d",
      lineColor: "#0068eb",
      pointInteractColor: "#00142d",
    };



      if(this.canvasSupportsDisplayP3() && this.canvasSupportsWideGamutCSSColors()) {
        setting.backgroundColor = 'oklch(19.12% 0.074 252.64)';
        setting.pointColor = 'oklch(19.12% 0.074 252.64)';
        setting.pointInteractColor = 'oklch(19.12% 0.074 252.64)';
        setting.lineColor = 'oklch(55% 0.261 259.05)';
      }

      this.$root.$emit('updateConstellation', setting);
  }
}
</script>
