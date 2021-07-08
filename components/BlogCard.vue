<template>
  <NuxtLink
    :to="{ name: 'blog-slug', params: { slug: article.slug } }"
    class="flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col"
  >
    <img v-if="article.img" class="h-48 xxlmin:w-1/2 xxlmax:w-full object-cover" :src="article.img" />

    <div class="p-6 flex flex-col justify-between xxlmin:w-1/2 xxlmax:w-full">
      <h2 class="font-bold">{{ article.title }}</h2>
      <p>by {{ article.author.name }}</p>
      <p class="font-bold text-gray-600 text-sm">
        {{ article.description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
};
</script>
