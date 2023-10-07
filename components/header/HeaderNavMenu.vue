<template>
  <nav class="flex-1 justify-end pr-10">
    <ul class="flex m-4 text-green text-title text-xl">
      <li v-for="link of links" :key="link.name" class="m-2">
        <NuxtLink v-if="link.selected" :to="link.url" class="text-teal font-bold border-b-1 border-green float-right">
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
