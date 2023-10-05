<template>
  <article class="flex w-full flex-col text-white">
    <ArticleHeader :article="article" :tags="tags"></ArticleHeader>
    <div
      class="
        relative
        xs:py-8 xs:px-8
        lg:py-16 lg:px-16 
        w-full
        h-full
        markdown-body
        post-right
        custom-scroll
      "
    >
      <em>{{ article.description }}</em>
      <p class="pb-4">Post last updated: {{ formatDate(article.updatedAt) }}</p>
      <TableOfContents :toc="article.toc"></TableOfContents>
      <!-- content from markdown -->
      <nuxt-content :document="article" />
      <!-- content author component -->
      <author :author="article.author" />
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
    const tagsList = await $content('tags')
      .only(['name', 'slug'])
      .where({ name: { $containsAny: article.tags } })
      .fetch();
    const tags = Object.assign({}, ...tagsList.map((s) => ({ [s.name]: s })));
    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
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
