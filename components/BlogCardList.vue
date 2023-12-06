<template>
  <div>
    <ul :class="[{ showLess: hideItems }, 'flex flex-wrap']">
      <li v-for="article of articles" :key="article.slug" class="xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12">
        <BlogCard :type="article.type ?? 'post'" :article="article" />
      </li>
    </ul>
    <div v-if="mounted && hideItems" class="flex justify-center mb-8">
      <button
        class="text-steel font-bold border-steel border-2 rounded-md px-4 py-2 hover:text-black hover:border-green hover:bg-green transition duration-300"
        aria-label="show more articles"
        @click="hideItems = false"
      >
        Show More
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      hideItems: true,
      mounted: false
    }
  },
  mounted() {
    if(document.body.clientWidth < 768) {
      this.hideItems = true;
    } else {
      this.hideItems = false;
    }
    this.mounted = true;
  }
};
</script>

<style>
ul.showLess li:nth-child(n+7) {
  display: none;
}
</style>
