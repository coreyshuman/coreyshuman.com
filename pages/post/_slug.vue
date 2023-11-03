<template>
  <article class="flex w-full flex-col text-white">
    <ArticleHeader :article="article" :tags="tags"></ArticleHeader>
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
      <em>{{ article.description }}</em>
      <p class="pb-4">Post last updated: {{ formatDate(article.updated) }}</p>
      <TableOfContents :toc="article.toc"></TableOfContents>
      <!-- content from markdown -->
      <nuxt-content :document="article" />
      <!-- prevNext component -->
      <PrevNext :prev="prev" :next="next" class="mt-8" />
    </div>
  </article>
</template>
<script>
import {util} from '../../util/util';

export default {
  mixins:[util],
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch();
    const tags = await $content('tags')
      .only(['name', 'slug'])
      .where({ name: { $containsAny: article.tags } })
      .fetch();
    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('created', 'asc')
      .surround(params.slug)
      .fetch();
    return {
      article,
      tags,
      prev,
      next
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
<style>
.nuxt-content {
  color: white;
}

.nuxt-content p {
  margin-bottom: 20px;
}

.nuxt-content h2,
.toc-header {
  font-weight: bold;
  font-size: 24px;
}

.nuxt-content h3 {
  font-weight: bold;
  font-size: 20px;
}

.icon.icon-link {
  content: url('~assets/svg/fas-link.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
</style>
