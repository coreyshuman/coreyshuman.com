<template>
  <div class="text-steel font-body">
    <div class="flex flex-wrap">
      <div v-for="home of homeHeader" :key="home.slug" class="xs:w-full xs:mb-6 md:mb-12">
        <h1 class="flex-1 font-bold font-title text-4xl mb-3">{{ home.title }}</h1>
        <div class="font-bold text-sm px-2">
          <nuxt-content :document="home" />
        </div>
      </div>
    </div>
    <div v-if="articles">
      <div class="flex items-center">
        <h1 class="flex-grow font-bold text-4xl mb-5">Latest Posts</h1>
        <span class="flex-grow text-right"
          ><NuxtLink to="/post" class="text-celeste hover:text-red transition duration-300 font-bold"
            >View Archive</NuxtLink
          ></span
        >
      </div>
      <ul class="flex flex-wrap">
        <li v-for="article of articles" :key="article.slug" class="xs:w-full md:w-1/2 xl:w-1/3 px-2 xs:mb-6 md:mb-12">
          <BlogCard :type="'post'" :article="article" />
        </li>
      </ul>
    </div>
    <div v-if="projects">
      <div class="flex items-center">
        <h1 class="flex-1 font-bold text-4xl mb-5">Recent Projects</h1>
        <span class="flex-1 text-right"
          ><NuxtLink to="/project" class="text-celeste hover:text-red transition duration-300 font-bold"
            >View Projects</NuxtLink
          ></span
        >
      </div>
      <ul class="flex flex-wrap">
        <li v-for="project of projects" :key="project.slug" class="xs:w-full md:w-1/2 xl:w-1/3 px-2 xs:mb-6 md:mb-12">
          <BlogCard :type="'project'" :article="project" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {util} from '../util/util';

export default {
  mixins:[util],
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'alt', 'slug'])
      .where({published: {$eq: true}})
      .sortBy('created', 'desc')
      .limit(3)
      .fetch();
    const projects = await $content('projects')
      .only(['title', 'description', 'img', 'alt', 'slug'])
      .sortBy('updated', 'desc')
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
    const setting = {
      lineColor: '#aef3e7',
      pointColor: '#37a1ae',
      pointInteractColor: '#d70049'
    };

    if(this.canvasSupportsDisplayP3() && this.canvasSupportsWideGamutCSSColors()) {
      setting.lineColor = 'oklch(91.5% 0.071 182.73)';
      setting.pointColor = 'oklch(86.6% 0.1425 207.16)';
      setting.pointInteractColor = 'oklch(55.86% 0.235 14.4)';
    }

    this.$root.$emit('updateConstellation', setting);
  }
};
</script>
