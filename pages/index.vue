<template>
  <div class="text-steel">
    <div class="flex flex-wrap">
      <div v-for="home of homeHeader" :key="home.slug" class="xs:w-full md:w-1/2 xl:w-1/3 px-2 xs:mb-6 md:mb-12">
        <h1 class="flex-1 font-bold text-4xl">{{ home.title }}</h1>
        <p class="font-bold text-steel text-sm text-body">
        <nuxt-content :document="home" />
      </p>
      </div>
    </div>
    <div class="flex items-center">
      <h1 class="flex-1 font-bold text-4xl">Latest Posts</h1>
      <span class="flex-1 text-right"><NuxtLink to="/blog" class="text-celeste">View Archive</NuxtLink></span>
    </div>
    <ul class="flex flex-wrap">
      <li v-for="article of articles" :key="article.slug" class="xs:w-full md:w-1/2 xl:w-1/3 px-2 xs:mb-6 md:mb-12">
        <BlogCard :article="article" />
      </li>
    </ul>
    <div class="flex items-center">
      <h1 class="flex-1 font-bold text-4xl">Recent Projects</h1>
      <span class="flex-1 text-right"><NuxtLink to="/projects" class="text-celeste">View Projects</NuxtLink></span>
    </div>
    <ul class="flex flex-wrap">
      <li v-for="project of projects" :key="project.slug" class="xs:w-full md:w-1/2 xl:w-1/3 px-2 xs:mb-6 md:mb-12">
        <BlogCard :article="project" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug'])
      .sortBy('createdAt', 'desc')
      .limit(3)
      .fetch();
    const projects = await $content('projects')
      .only(['name', 'description', 'img', 'slug'])
      .sortBy('createdAt', 'desc')
      .limit(3)
      .fetch();
    const homeHeader = await $content('home')
      .sortBy('createdAt', 'desc')
      .limit(1)
      .fetch();
    return {
      articles,
      projects,
      homeHeader
    };
  },
  mounted() {
    this.$root.$emit('updateConstellation', {});
  }
};
</script>
