<template>
  <NuxtLink
    :to="{ name: `${type}-slug`, params: { slug: article.slug } }"
    class="group relative flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md flex-col bg-black bg-opacity-60 text-white rounded-lg h-full"
  >
    <img
      v-if="article.img"
      class="h-48 xxlmax:w-full object-cover rounded-t-lg m-px"
      :src="article.img"
      :alt="article.alt"
    />

    <div class="p-6 flex flex-col justify-between w-full">
      <div class="flex flex-col lg:flex-row">
        <h2
          class="flex-1 flex-grow w-full font-bold text-lg text-body text-green group-hover:text-red transition duration-300"
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

const lastLocation = {clientX: 0, clientY: 0};

const settings = {
  radialColor: '#8ee3ef',
  radialSize: 300,
  borderColor: '#666',
  borderWidth: 3,
  borderRadius: 8
};

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
  mounted() {
    document.addEventListener('mousemove', this.updateMousePosition);
    window.addEventListener('resize', this.handleResize);
    this.updateMousePosition(lastLocation);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.updateMousePosition);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    updateMousePosition(e) {
      const { x, y } = this.$el.getBoundingClientRect();
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      canvas.width = Math.ceil(this.$el.clientWidth);
      canvas.height = Math.ceil(this.$el.clientHeight);
      // Create Radial
      const grd = ctx.createRadialGradient(e.clientX - x, e.clientY - y, 5, e.clientX - x, e.clientY - y, settings.radialSize);
      grd.addColorStop(0, settings.radialColor);
      grd.addColorStop(1, settings.borderColor);

      ctx.fillStyle = grd;
      ctx.fillRect(settings.borderRadius + 1, 0, canvas.width - 2 * (settings.borderRadius + 1), settings.borderWidth); // top
      ctx.fillRect(settings.borderRadius + 2, canvas.height - settings.borderWidth, canvas.width - 2 * (settings.borderRadius + 1), canvas.height); // bottom
      ctx.fillRect(0, settings.borderRadius + 1, settings.borderWidth, canvas.height - 2 * (settings.borderRadius + 1)); // left
      ctx.fillRect(canvas.width - settings.borderWidth, settings.borderRadius + 1, canvas.width, canvas.height - 2 * (settings.borderRadius + 1)); // right

      ctx.strokeStyle = grd;
      ctx.lineWidth = settings.borderWidth;
      ctx.arc(settings.borderRadius + settings.borderWidth / 2.2 + .25, settings.borderRadius + settings.borderWidth / 2.2 + .25, settings.borderRadius, Math.PI, 3/2 * Math.PI); // top left
      ctx.moveTo(settings.borderRadius, canvas.height);
      ctx.arc(settings.borderRadius + settings.borderWidth / 2.2 + .25, canvas.height - settings.borderRadius - (settings.borderWidth / 2.2 + .25), settings.borderRadius, 1/2 * Math.PI, Math.PI); // bottom left
      ctx.moveTo(canvas.width - settings.borderRadius, 0);
      ctx.arc(canvas.width - settings.borderRadius - (settings.borderWidth / 2.2 + .25), settings.borderRadius + settings.borderWidth / 2.2 + .25, settings.borderRadius, 3/2 * Math.PI, 2 * Math.PI); // top right
      ctx.moveTo(canvas.width, canvas.height - settings.borderRadius);
      ctx.arc(canvas.width - settings.borderRadius - (settings.borderWidth / 2.2 + .25), canvas.height - settings.borderRadius - (settings.borderWidth / 2.2 + .25), settings.borderRadius, 0, 1/2 * Math.PI); // bottom right
      ctx.stroke();
    },
    handleResize() {
      this.updateMousePosition(lastLocation);
    }
  }

};
</script>
