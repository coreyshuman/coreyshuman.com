<template>
  <nav class="flex-1 justify-end pr-0 sm:pr-10">
    <ul class="flex m-2 sm:m-5 text-green text-title text-xl">
      <li v-for="link of links" :key="link.name" class="mx-2">
        <NuxtLink v-if="link.selected" :to="link.url" class="text-celeste font-bold float-right">
          {{link.name}}
        </NuxtLink>
        <NuxtLink v-else :to="link.url" class="hover:text-red transition duration-300 float-right">
          {{link.name}}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    links: {
      type: Array,
      required: true
    },
  }
}
</script>
