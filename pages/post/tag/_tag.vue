<template>
  <div class="text-steel font-body">
    <NuxtLink to="/post"
      ><p class="text-celeste font-bold hover:text-red transition duration-300">Back to All Articles</p></NuxtLink
    >
    <h1 class="mb-3 text-title font-bold text-4xl">
      Articles tagged <span class="text-purple uppercase">{{ tag.name }}</span
      >:
    </h1>
    <ul>
      <li v-for="article in articles" :key="article.slug" class="w-full px-2 xs:mb-6 md:mb-12 article-card group">
        <NuxtLink :to="{ name: 'post-slug', params: { slug: article.slug } }" class="flex xxlmax:flex-col">
          <img
            v-if="article.img"
            class="h-48 xxlmin:w-1/2 xxlmax:w-full object-cover transition duration-300 ease-linear blur-sm group-hover:blur-none"
            :src="article.img"
            :alt="article.alt"
          />

          <div class="p-6 flex flex-col xxlmin:w-1/2 xxlmax:w-full">
            <h2 class="font-bold text-green group-hover:text-red transition duration-300">{{ article.title }}</h2>
            <p class="text-sm mb-2">
              {{ formatDate(article.date || article.updatedAt) }}
            </p>
            <p>{{ article.description }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import {util} from '../../../util/util';

export default {
  mixins:[util],
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
  }
};
</script>
