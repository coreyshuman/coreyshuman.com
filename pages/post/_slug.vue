<template>
  <article class="flex w-full flex-col text-white">
    <div class="relative w-full xs:h-60 post-left">
      <img :src="article.img" :alt="article.alt" class="absolute h-full w-full object-cover" />
      <div class="absolute h-full w-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
        <div class="absolute top-30 left-32">
          <div class="mt-16 flex uppercase text-sm">
            <p class="mr-3">
              {{ formatDate(article.date || article.updatedAt) }}
            </p>
            <span class="mr-3">•</span>
            <p>{{ article.author.name }}</p>
          </div>
          <h1 class="xs:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{{ article.title }}</h1>
          <span v-for="(tag, id) in article.tags" :key="id">
            <NuxtLink :to="`/post/tag/${tags[tag].slug}`">
              <span
                class="
                truncate
                uppercase
                tracking-wider
                font-medium
                text-ss
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
                {{ tags[tag].name }}
              </span>
            </NuxtLink>
          </span>
        </div>
        <div class="flex absolute top-1rem sm:right-3rem right-1rem">
          <NuxtLink
            to="/"
            class="mr-8 self-center text-white font-bold transition-colors hover:text-green duration-300 ease-linear"
          >
            All articles
          </NuxtLink>
          <AppSearchInput />
        </div>
      </div>
    </div>
    <div
      class="
        relative
        xs:py-8 xs:px-8
        lg:py-16 lg:px-16 
        w-full
        h-full
        markdown-body
        post-right
        custom-scroll
      "
    >
      <em>{{ article.description }}</em>
      <p class="pb-4">Post last updated: {{ formatDate(article.updatedAt) }}</p>
      <!-- table of contents -->
      <h2 v-if="article.toc.length" class="toc-header">Table of Contents</h2>
      <nav class="pb-6 text-purple">
        <ul>
          <li
            v-for="link of article.toc"
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
      <!-- content from markdown -->
      <nuxt-content :document="article" />
      <!-- content author component -->
      <author :author="article.author" />
      <!-- prevNext component -->
      <PrevNext :prev="prev" :next="next" class="mt-8" />
    </div>
  </article>
</template>
<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch();
    const tagsList = await $content('tags')
      .only(['name', 'slug'])
      .where({ name: { $containsAny: article.tags } })
      .fetch();
    const tags = Object.assign({}, ...tagsList.map((s) => ({ [s.name]: s })));
    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch();
    return {
      article,
      tags,
      prev,
      next
    };
  },
  mounted() {
    this.$root.$emit('updateConstellation', {
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
      pointInteractColor: "#dd33dd",
    });
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    }
  },

};
</script>
<style>
.nuxt-content {
  color: white;
}

.nuxt-content p {
  margin-bottom: 20px;
}

.nuxt-content h2,
.toc-header {
  font-weight: bold;
  font-size: 28px;
}

.nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
}

.icon.icon-link {
  content: url('~assets/svg/fas-link.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
</style>
