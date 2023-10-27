<template>
  <div class="text-steel text-body">
    <h1 class="text-title font-bold text-4xl mb-3">Articles</h1>
    <ul class="flex flex-wrap">
      <li v-for="article of articles" :key="article.slug" class="xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 article-card">
        <BlogCard :type="'post'" :article="article" />
      </li>
    </ul>
    <h1 class="text-title font-bold text-4xl mb-3">Topics</h1>
    <ul class="flex flex-wrap mb-4 text-center">
      <li v-for="tag of tags" :key="tag.slug" class="xs:w-full md:w-1/3 lg:flex-1 px-2 text-center">
        <NuxtLink
          :to="`/post/tag/${tag.slug}`"
          class="text-celeste font-bold hover:text-red transition duration-300 uppercase tracking-wider"
        >
          {{ tag.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author', 'created', 'updated'])
      .sortBy('created', 'desc')
      .fetch();
    const tags = await $content('tags')
      .only(['name', 'slug'])
      .sortBy('name', 'asc')
      .fetch();
    return {
      articles,
      tags
    };
  },
  mounted() {
    this.$root.$emit('updateConstellation', {
      pointDensity: 30,
      pointSize: 3,
      friction: .03,
      frictionMinVelocity: .5,
      attractDistanceRange: [0, 0],
      attractForceRange: [0, 0],
      repelDistanceRange: [0, 60],
      repelForceRange: [.25, 0],
      maxLineLength: 60,
      lineSize: 1,
      screenBlur: .6,
      maxInteractDistance: 175,
      maxInteractForce: 1,
      interactMode: "repel",
      backgroundColor: "#000000",
      pointColor: "#0096ff",
      lineColor: "#00fdff",
      pointInteractColor: "#dd33dd",
    });
  }
};
</script>

<style class="postcss">
.article-card {
  border-radius: 8px;
}

.article-card img div {
  border-radius: 8px 0 0 8px;
}
</style>
