<template>
  <NuxtLink
    :to="{ name: `${type}-slug`, params: { slug: article.slug } }"
    class="
      group
      relative
      flex
      flex-col
      bg-black
      bg-opacity-60
      rounded-lg
      h-full
"
  >
    <ProgressiveImage
      v-if="article.img"
      :src="article.img"
      :alt="article.alt"
      height="12rem"
      width="calc(100% - 2px)"
      size="medium"
      fit="cover"
      class="rounded-t-lg h-48 m-px"
      image-class="rounded-t-lg"
      :tabindex="-1"
      aria-hidden="true"
    />

    <div class="absolute w-full h-48 bg-black bg-opacity-40 group-hover:bg-opacity-10 transition-bg duration-300"></div>

    <div class="p-6 flex flex-col justify-between w-full">
      <div class="flex flex-col lg:flex-row">
        <h2
          class="flex-1 flex-grow w-full font-bold text-lg text-body text-green group-hover:text-red group-focus:text-red transition duration-300"
        >
          {{ article.title }}
        </h2>
        <span class="text-body text-sm mb-2">{{ formatDate(article.created || article.createdAt) }}</span>
      </div>
      <p class="text-body">
        {{ article.description }}
      </p>
    </div>
    <canvas ref="canvas" class="absolute top-0 left-0 z-0"></canvas>
  </NuxtLink>
</template>

<script>
import {util} from '../util/util';


export default {
  mixins:[util],
  props: {
    type: {
      type: String,
      required: true
    },
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      location: {clientX: 0, clientY: 0},
      settings: {
        radialColor: '#6dffeb',
        radialSize: 300,
        borderColor: '#666',
        borderWidth: 3,
        borderRadius: 8
      },
      animationEnabled: true
    }
  },
  beforeMount() {
    if(this.canvasSupportsDisplayP3() && this.canvasSupportsOklchColors()) {
      this.settings.radialColor = 'oklch(91.47% 0.1479 182.73)';
    } else if(this.canvasSupportsDisplayP3() && this.canvasSupportsWideGamutCSSColors()) {
      this.settings.radialColor = 'color(display-p3 0.526 0.9998 0.9242)';
    }
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    document.addEventListener('mousemove', this.updateMousePosition);
    document.addEventListener('touchstart', this.updateMousePosition);
    document.addEventListener('touchmove', this.updateMousePosition);

    this.updateMousePosition(this.location);
    requestAnimationFrame(this.drawFrame);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.updateMousePosition);
    document.removeEventListener('touchstart', this.updateMousePosition);
    document.removeEventListener('touchmove', this.updateMousePosition);
    window.removeEventListener('resize', this.handleResize);
    this.animationEnabled = false;
  },
  methods: {
    updateMousePosition(e) {
      let clientX = 0;
      let clientY = 0;
      if(e.changedTouches) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else if(e.clientX) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      this.location.clientX = clientX;
      this.location.clientY = clientY;
    },
    drawFrame() {
      if(!this.animationEnabled) {
        return;
      }

      const { x, y } = this.$el.getBoundingClientRect();
      const { clientX, clientY } = this.location;
      const canvas = this.$refs.canvas;
      let ctx;
      if (this.displaySupportsP3Color() && this.canvasSupportsDisplayP3()) {
        ctx = canvas.getContext('2d', { colorSpace: 'display-p3' });
      } else {
        ctx = canvas.getContext('2d');
      }
      canvas.width = Math.ceil(this.$el.clientWidth);
      canvas.height = Math.ceil(this.$el.clientHeight);

      const grd = ctx.createRadialGradient(clientX - x, clientY - y, 5, clientX - x, clientY - y, this.settings.radialSize);
      grd.addColorStop(0, this.settings.radialColor);
      grd.addColorStop(1, this.settings.borderColor);

      ctx.fillStyle = grd;
      ctx.fillRect(this.settings.borderRadius + 1, 0, canvas.width - 2 * (this.settings.borderRadius + 1), this.settings.borderWidth); // top
      ctx.fillRect(this.settings.borderRadius + 2, canvas.height - this.settings.borderWidth, canvas.width - 2 * (this.settings.borderRadius + 1), canvas.height); // bottom
      ctx.fillRect(0, this.settings.borderRadius + 1, this.settings.borderWidth, canvas.height - 2 * (this.settings.borderRadius + 1)); // left
      ctx.fillRect(canvas.width - this.settings.borderWidth, this.settings.borderRadius + 1, canvas.width, canvas.height - 2 * (this.settings.borderRadius + 1)); // right

      ctx.strokeStyle = grd;
      ctx.lineWidth = this.settings.borderWidth;
      ctx.arc(this.settings.borderRadius + this.settings.borderWidth / 2.2 + .25, this.settings.borderRadius + this.settings.borderWidth / 2.2 + .25, this.settings.borderRadius, Math.PI, 3/2 * Math.PI); // top left
      ctx.moveTo(this.settings.borderRadius, canvas.height);
      ctx.arc(this.settings.borderRadius + this.settings.borderWidth / 2.2 + .25, canvas.height - this.settings.borderRadius - (this.settings.borderWidth / 2.2 + .25), this.settings.borderRadius, 1/2 * Math.PI, Math.PI); // bottom left
      ctx.moveTo(canvas.width - this.settings.borderRadius, 0);
      ctx.arc(canvas.width - this.settings.borderRadius - (this.settings.borderWidth / 2.2 + .25), this.settings.borderRadius + this.settings.borderWidth / 2.2 + .25, this.settings.borderRadius, 3/2 * Math.PI, 2 * Math.PI); // top right
      ctx.moveTo(canvas.width, canvas.height - this.settings.borderRadius);
      ctx.arc(canvas.width - this.settings.borderRadius - (this.settings.borderWidth / 2.2 + .25), canvas.height - this.settings.borderRadius - (this.settings.borderWidth / 2.2 + .25), this.settings.borderRadius, 0, 1/2 * Math.PI); // bottom right
      ctx.stroke();

      requestAnimationFrame(this.drawFrame);
    },
    handleResize() {
      this.updateMousePosition(this.location);
    }
  }

};
</script>
