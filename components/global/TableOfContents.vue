<template>
  <div v-if="toc.length > 1">
    <h2 class="font-bold text-2xl">Table of Contents</h2>
    <nav class="pb-6 text-red">
      <ul>
        <li
          v-for="link of toc"
          :key="link.id"
          :class="{
            'font-semibold': link.depth === 2
          }"
        >
          <nuxtLink
            :to="`#${link.id}`"
            class="hover:underline"
            :class="{
              'py-2': link.depth === 2,
              'ml-2 pb-2': link.depth === 3
            }"
            >{{ link.text }}</nuxtLink
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
      toc: {
        type: Array,
        required: true
      }
  }
};
</script>
