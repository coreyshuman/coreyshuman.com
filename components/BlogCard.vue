<template>
  <NuxtLink
    :to="{ name: `${type}-slug`, params: { slug: article.slug } }"
    class="flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md flex-col bg-black bg-opacity-60 text-white border-steel border-2 rounded-lg h-full"
  >
    <img
      v-if="article.img"
      class="h-48 xxlmax:w-full object-cover rounded-t-lg"
      :src="article.img"
      :alt="article.alt"
    />

    <div class="p-6 flex flex-col justify-between w-full">
      <div class="flex flex-col lg:flex-row">
        <h2 class="flex-1 flex-grow w-full font-bold text-lg text-body text-green">{{ article.title }}</h2>
        <span class="text-body text-sm mb-2">{{ formatDate(article.date || article.updatedAt) }}</span>
      </div>
      <p class="text-body">
        {{ article.description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script>
import {util} from '../util/util';

export default {
  mixins:[util],
  props: {
    type: {
      type: String,
      required: true
    },
    article: {
      type: Object,
      required: true
    }
  }
};
</script>
