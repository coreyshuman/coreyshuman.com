<template>
  <div class="text-steel">
    <div class="flex items-center">
      <h1 class="flex-1 font-bold text-4xl">Latest Posts</h1>
      <span class="flex-1 text-right"><NuxtLink to="/blog" class="text-celeste">View Archive</NuxtLink></span>
    </div>
    <ul class="flex flex-wrap">
      <li v-for="article of articles" :key="article.slug" class="xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 article-card">
        <BlogCard :article="article" />
      </li>
    </ul>
    <h1 class="font-bold text-4xl">Recent Projects</h1>
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
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .limit(3)
      .fetch();
    const tags = await $content('tags')
      .only(['name', 'description', 'img', 'slug'])
      .sortBy('name', 'asc')
      .limit(3)
      .fetch();
    return {
      articles,
      tags
    };
  },
  mounted() {
    this.$root.$emit('updateConstellation', {});
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
