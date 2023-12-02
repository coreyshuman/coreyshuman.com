<template>
  <NuxtLink
    :to="`/post/tag/${tag.slug}`"
    class="
        flex
        min-w-12
        truncate
        uppercase
        tracking-wider
        font-medium
        justify-center
        px-2
        py-1
        rounded-full
        mr-2
        mb-2
        border-2
        border-white
        transition-colors
        hover:text-black
        focus:text-black
        hover:bg-green
        focus:bg-green
        hover:border-green
        focus:border-green
        duration-300
      "
  >
    {{ tag.name }}
  </NuxtLink>
</template>

<script>
export default {
props: {
    tag: {
      type: Object,
      required: true
    }
}
};
</script>
