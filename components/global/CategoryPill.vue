<template>
  <NuxtLink :to="`/post/tag/${tag.slug}`">
    <span
      class="
        flex
        shrink
        truncate
        uppercase
        tracking-wider
        font-medium
        text-ss
        justify-center
        px-2
        py-1
        rounded-full
        mr-2
        mb-2
        border-2
        border-light-border
        dark:border-dark-border
        transition-colors
        hover:text-green
        duration-300
        ease-linear
      "
    >
      {{ tag.name }}
    </span>
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
