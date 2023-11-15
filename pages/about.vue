<template>
  <div
    class="
          relative
          py-8 px-0
          xs:py-8 xs:px-2
          lg:py-16 lg:px-8 
          w-full
          h-full
          text-steel
        "
  >
    About
    <ProgressiveImage
      src="/assets/headers/car.png"
      alt="a car in a desert"
      blur="2px"
      loading-blur="2px"
      size="large"
      fit="fill"
    >
    </ProgressiveImage>
  </div>
</template>
<script>
import ProgressiveImage from '~/components/global/ProgressiveImage.vue';
import { util } from '~/util/util';

export default {
  components: { ProgressiveImage },
  mixins: [util],
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
    if (this.canvasSupportsDisplayP3() && this.canvasSupportsWideGamutCSSColors()) {
      setting.backgroundColor = 'oklch(19.12% 0.074 252.64)';
      setting.pointColor = 'oklch(19.12% 0.074 252.64)';
      setting.pointInteractColor = 'oklch(19.12% 0.074 252.64)';
      setting.lineColor = 'oklch(55% 0.261 259.05)';
    }
    this.$root.$emit('updateConstellation', setting);
  }
}
</script>
