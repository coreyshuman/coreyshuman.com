<template>
  <div class="flex lg:h-screen w-full lg:overflow-hidden xs:flex-col lg:flex-row text-white">
    <div class="relative lg:w-1/3 xxlmin:w-1/4 xs:w-full xs:h-84 lg:h-full post-left">
      <img :src="tag.img" :alt="tag.name" class="absolute h-full w-full object-cover" />
      <div class="absolute h-full w-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
      <div class="relative w-full h-full">
        <div class="mt-10 xs:mx-4 xxlmin:mx-8 flex flex-col text-sm">
          <div class="relative post-left">
            <h1 class="text-4xl font-bold uppercase">
              {{ tag.name }}
            </h1>
            <p class="mb-4 uppercase">{{ tag.description }}</p>

            <nuxt-content :document="tag" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="
        relative
        xs:py-8 xs:px-8
        lg:py-0 lg:px-16 
        lg:w-2/3 xxlmin:w-3/4 xs:w-full
        h-full
        overflow-y-scroll
        markdown-body
        post-right
        custom-scroll
      "
    >
      <NuxtLink to="/post"><p class=" text-green hover:underline">Back to All Articles</p></NuxtLink>
      <h3 class="mb-4 font-bold text-4xl">
        Articles tagged <span class="text-purple">{{ tag.name }}</span
        >:
      </h3>
      <ul>
        <li v-for="article in articles" :key="article.slug" class="w-full px-2 xs:mb-6 md:mb-12 article-card group">
          <NuxtLink :to="{ name: 'post-slug', params: { slug: article.slug } }" class="flex xxlmax:flex-col">
            <img
              v-if="article.img"
              class="h-48 xxlmin:w-1/2 xxlmax:w-full object-cover transition duration-300 ease-linear blur-sm group-hover:blur-none"
              :src="article.img"
              :alt="article.alt"
            />

            <div class="p-6 flex flex-col justify-between xxlmin:w-1/2 xxlmax:w-full">
              <h2 class="font-bold group-hover:text-green">{{ article.title }}</h2>
              <p>{{ article.description }}</p>
              <p class="font-bold text-gray-600 text-sm">
                {{ formatDate(article.date || article.updatedAt) }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const tags = await $content('tags')
      .where({ slug: { $contains: params.tag } })
      .limit(1)
      .fetch();
    const tag = tags.length > 0 ? tags[0] : {};
    const articles = await $content('articles')
      .where({ tags: { $contains: tag.name } })
      .sortBy('createdAt', 'asc')
      .fetch();
    return {
      articles,
      tag
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    }
  }
};
</script>
