<template>
  <div class="text-steel">
    <h1 class="text-title font-bold text-4xl mb-3">Projects</h1>
    <ul class="flex flex-wrap">
      <li v-for="article of projects" :key="article.slug" class="xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 article-card">
        <BlogCard :type="'project'" :article="article" />
      </li>
    </ul>
    <h3 class="mb-4 font-bold text-2xl uppercase text-center">Topics</h3>
    <ul class="flex flex-wrap mb-4 text-center">
      <li v-for="tag of tags" :key="tag.slug" class="xs:w-full md:w-1/3 lg:flex-1 px-2 text-center">
        <NuxtLink :to="`/blog/tag/${tag.slug}`" class="">
          <p class="font-bold text-gray uppercase tracking-wider font-medium text-ss">
            {{ tag.name }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    async asyncData({ $content }) {
    const projects = await $content('projects')
      .only(['title', 'description', 'img', 'alt', 'slug'])
      .sortBy('createdAt', 'desc')
      .fetch();
    const tags = await $content('tags')
      .only(['name', 'description', 'img', 'slug'])
      .sortBy('createdAt', 'asc')
      .fetch();
    return {
      projects,
      tags
    };
  },
  mounted() {
    this.$root.$emit('updateConstellation', {
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
      backgroundColor: "#250052",
      pointColor: "#fff700",
      lineColor: "#250052",
      pointInteractColor: "#250052",
    });
  }
}
</script>
