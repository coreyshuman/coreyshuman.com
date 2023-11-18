<template>
  <div class="text-steel text-body">
    <div class="grid grid-cols-1">
      <div class="order-first lg:order-last">
        <h1 class="text-title font-bold text-4xl mb-3">Articles</h1>
        <ul :class="[{showLess: hideItems}, 'flex flex-wrap']">
          <li
            v-for="article of articles"
            :key="article.slug"
            class="xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 article-card"
          >
            <BlogCard :type="'post'" :article="article" />
          </li>
        </ul>
        <div v-if="hideItems===true" class="flex justify-center mb-8">
          <button
            class="text-steel font-bold border-steel border-2 rounded-md px-4 py-2 hover:text-black hover:border-green hover:bg-green transition duration-300"
            @click="hideItems=false"
          >
            Show More
          </button>
        </div>
      </div>
      <div class="order-1">
        <h1 class="text-title font-bold text-4xl mb-3">Topics</h1>
        <div
          v-if="tags"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-items-stretch gap-y-2 gap-x-3 mb-8"
        >
          <CategoryPill v-for="(tag, id) in tags" :key="id" :tag="tag"></CategoryPill>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { util } from '~/util/util';

export default {
  mixins:[util],
  async asyncData({ $content }) {
    let articles = await $content('articles')
      .only(['title', 'description', 'img', 'alt', 'slug', 'author', 'created', 'updated', 'published'])
      .sortBy('created', 'desc')
      .fetch();

    if(process.env.NODE_ENV === 'production') {
      articles = articles.filter(article => article.published === true);
    }
    const tags = await $content('tags')
      .only(['name', 'slug'])
      .sortBy('name', 'asc')
      .fetch();
    return {
      articles,
      tags
    };
  },
  data() {
    return {
      hideItems: false
    }
  },
  watch: {
    hideItems() {
      // todo - emit event to refresh blog cards
    }
  },
  mounted() {
    const setting = {
      pointDensity: 30,
      pointSize: 3,
      friction: .03,
      frictionMinVelocity: .5,
      attractDistanceRange: [0, 0],
      attractForceRange: [0, 0],
      repelDistanceRange: [0, 60],
      repelForceRange: [.25, 0],
      maxLineLength: 60,
      lineSize: 1,
      screenBlur: .6,
      maxInteractDistance: 175,
      maxInteractForce: 1,
      interactMode: "repel",
      backgroundColor: "#000000",
      pointColor: "#0096ff",
      lineColor: "#00fdff",
      pointInteractColor: "#e500e6",
    };

    if(this.canvasSupportsDisplayP3() && this.canvasSupportsWideGamutCSSColors()) {
      setting.lineColor = 'oklch(90.07% 0.1632 195.79801207647859)';
      setting.pointColor = 'oklch(66.24% 0.2013 249.84330207949222)';
      setting.pointInteractColor = 'oklch(64.77% 0.3253 328.12)';
    }

    this.$root.$emit('updateConstellation', setting);

    if(document.body.clientWidth < 768) {
      this.hideItems = true;
    }
  }
};
</script>

<style class="postcss">
.article-card {
  border-radius: 8px;
}

.article-card img div {
  border-radius: 8px 0 0 8px;
}

ul.showLess li:nth-child(n+7) {
  display: none;
}
</style>
