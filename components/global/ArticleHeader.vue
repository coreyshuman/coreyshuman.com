<template>
  <div class="relative w-full h-60 post-left">
    <img :src="article.img" :alt="article.alt" class="absolute h-full w-full object-cover" />
    <div class="absolute h-full w-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div class="absolute top-30 xs:left-16 xs:right-16 sm:left-32 sm:right-32">
        <div class="mt-16 flex uppercase text-sm">
          <p class="mr-3">
            {{ formatDate(article.date || article.updatedAt) }}
          </p>
          <span class="mr-3">•</span>
          <p>{{ article.author.name }}</p>
        </div>
        <h1 class="xs:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{{ article.title }}</h1>
        <div class="flex flex-wrap">
          <span v-for="(tag, id) in article.tags" :key="id">
            <CategoryPill :tag="tags[tag]"></CategoryPill>
          </span>
        </div>
      </div>
      <div class="flex absolute top-1rem sm:right-3rem right-1rem">
        <NuxtLink
          to="/post"
          class="sm:mr-8 xs:mr-2 self-center text-white font-bold transition-colors hover:text-green duration-300 ease-linear"
        >
          All articles
        </NuxtLink>
        <AppSearchInput />
      </div>
    </div>
  </div>
</template>

<script>
import {util} from '../../util/util';

export default {
  mixins:[util],
  props: {
      article: {
        type: Object,
        required: true
      },
      tags: {
        type: Object,
        required: true
      }
  }
};
</script>
