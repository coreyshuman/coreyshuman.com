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
