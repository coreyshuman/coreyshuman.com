<template>
  <div class="text-steel">
    <h1 class="text-title font-bold text-4xl mb-3">Projects</h1>
    <ul class="flex flex-wrap">
      <li v-for="article of projects" :key="article.slug" class="xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 article-card">
        <BlogCard :type="'project'" :article="article" />
      </li>
    </ul>
  </div>
</template>
<script>
import { util } from '~/util/util';

export default {
  mixins:[util],
  async asyncData({ $content }) {
    const projects = await $content('projects')
      .only(['title', 'description', 'img', 'alt', 'slug'])
      .sortBy('created', 'desc')
      .fetch();
    const tags = await $content('tags')
      .only(['name', 'description', 'img', 'slug'])
      .sortBy('name', 'asc')
      .fetch();
    return {
      projects,
      tags
    };
  },
  mounted() {
    const setting = {
      pointDensity: 5,
      pointSize: 3,
      friction: .050,
      frictionMinVelocity: .5,
      attractDistanceRange: [1, 100],
      attractForceRange: [0,0],
      repelDistanceRange: [200, 300],
      repelForceRange: [0, .01],
      maxLineLength: 70,
      lineSize: 6,
      screenBlur: .6,
      maxInteractDistance: 60,
      maxInteractForce: 3000,
      interactMode: "attract",
      backgroundColor: "#100020",
      pointColor: "#fff700",
      lineColor: "#100020",
      pointInteractColor: "#100020",
    };

    if(this.canvasSupportsDisplayP3() && this.canvasSupportsWideGamutCSSColors()) {
      setting.backgroundColor = 'oklch(13.89% 0.075 304.5)';
      setting.lineColor = 'oklch(13.89% 0.075 304.5)';
      setting.pointColor = 'oklch(95.15% 0.2209 107.32)';
      setting.pointInteractColor = 'oklch(13.89% 0.075 304.5)';
    }

    this.$root.$emit('updateConstellation', setting);
  }
}
</script>
