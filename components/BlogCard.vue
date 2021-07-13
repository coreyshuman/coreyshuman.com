<template>
  <NuxtLink
    :to="{ name: 'blog-slug', params: { slug: article.slug } }"
    class="flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md flex-col bg-black bg-opacity-60 text-white border-steel border-2 rounded-lg"
  >
    <img v-if="article.img" class="h-48 xxlmax:w-full object-cover rounded-l-lg" :src="article.img" />

    <div class="p-6 flex flex-col justify-between w-full">
      <h2 class="font-bold text-lg text-body text-green">{{ article.title }}</h2>
      <p class="font-bold text-steel text-sm text-body">
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
