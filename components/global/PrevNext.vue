<template>
  <div class="grid grid-cols-2 gap-2">
    <NuxtLink
      v-if="prev"
      :to="{ name: 'post-slug', params: { slug: prev.slug } }"
      class="text-steel font-bold border-steel border-2 rounded-md px-4 py-2 hover:text-black hover:border-green hover:bg-green transition duration-300"
    >
      <div><fa :icon="['fas', 'arrow-alt-circle-left']" />&nbsp;Previous</div>

      <div class="truncate">{{ prev.title }}</div>
    </NuxtLink>
    <span v-else>&nbsp;</span>
    <NuxtLink
      v-if="next"
      :to="{ name: 'post-slug', params: { slug: next.slug } }"
      class="text-steel font-bold border-steel border-2 rounded-md px-4 py-2 hover:text-black hover:border-green hover:bg-green transition duration-300"
    >
      <div class="text-right">Next&nbsp;<fa :icon="['fas', 'arrow-alt-circle-right']" /></div>
      <div class="truncate text-right">{{ next.title }}</div>
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null
    },
    next: {
      type: Object,
      default: () => null
    }
  }
};
</script>
