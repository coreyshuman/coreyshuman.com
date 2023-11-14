<template>
  <div class="relative w-full z-10">
    <ProgressiveImage
      v-if="article.img"
      :src="article.img"
      :alt="article.alt"
      width="100%"
      height="100%"
      size="large"
      fit="cover"
      class="absolute h-full w-full"
    />
    <div class="w-full min-h-60 py-4 px-2 sm:px-8 lg:px-16 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div class="flex justify-end">
        <NuxtLink
          to="/post"
          class="sm:mr-8 xs:mr-2 self-center text-white font-bold transition-colors hover:text-green duration-300 ease-linear"
        >
          All articles
        </NuxtLink>
        <AppSearchInput />
      </div>
      <div class="">
        <div class="mt-4 flex uppercase text-sm">
          <p class="mr-3">
            {{ formatDate(article.created || article.createdAt) }}
          </p>
          <span class="mr-3">•</span>
          <p>{{ article.author.name }}</p>
        </div>
        <h1 class="xs:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{{ article.title }}</h1>
        <div v-if="tags" class="flex flex-wrap">
          <span v-for="(tag, id) in tags" :key="id">
            <CategoryPill :tag="tag"></CategoryPill>
          </span>
        </div>
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
        type: Array,
        required: true
      }
  }
};
</script>
