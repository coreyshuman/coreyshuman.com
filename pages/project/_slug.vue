<template>
  <article class="text-steel font-body">
    <ArticleHeader :article="project" :tags="tags"></ArticleHeader>
    <div
      class="
            relative
            py-8 px-0
            xs:py-8 xs:px-2
            lg:py-16 lg:px-8 
            w-full
            h-full
        "
    >
      <em>{{ project.description }}</em>
      <p class="pb-4">Post last updated: {{ formatDate(project.updated) }}</p>
      <TableOfContents :toc="project.toc"></TableOfContents>
      <nuxt-content :document="project" />
    </div>
    <div v-if="articles.length">
      <div class="flex items-center">
        <h1 class="flex-1 font-bold text-4xl mb-5">Related Posts</h1>
        <span class="flex-1 text-right"
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
  </article>
</template>

<script>
import {util} from '../../util/util';

export default {
  mixins:[util],
  async asyncData({ $content, params }) {
    const project = await $content('projects', params.slug).fetch();
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug'])
      .where({ projects: { $containsAny: project.slug } })
      .sortBy('createdAt', 'desc')
      .fetch();
    const tags = await $content('tags')
      .only(['name', 'slug'])
      .where({ name: { $containsAny: project.tags } })
      .fetch();
    return {
      articles,
      project,
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
      backgroundColor: "#100020",
      pointColor: "#fff700",
      lineColor: "#100020",
      pointInteractColor: "#100020",
    });
  }
};
</script>
