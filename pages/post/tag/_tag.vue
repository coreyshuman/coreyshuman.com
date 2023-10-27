<template>
  <div class="text-steel font-body">
    <NuxtLink to="/post"
      ><p class="text-celeste font-bold hover:text-red transition duration-300">Back to All Articles</p></NuxtLink
    >
    <h1 class="mb-3 text-title font-bold text-4xl">
      Articles and Projects tagged <span class="text-purple uppercase">{{ tag.name }}</span
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
              {{ formatDate(article.updated || article.updatedAt) }}
            </p>
            <p>{{ article.description }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <h1 class="text-title font-bold text-4xl mb-3">Topics</h1>
    <ul class="flex flex-wrap mb-4 text-center">
      <li v-for="tag of tags" :key="tag.slug" class="xs:w-full md:w-1/3 lg:flex-1 px-2 text-center">
        <NuxtLink
          :to="`/post/tag/${tag.slug}`"
          class="text-celeste font-bold hover:text-red transition duration-300 uppercase tracking-wider"
        >
          {{ tag.name }}
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
    const tag = await $content('tags', params.tag)
      .only(['name', 'slug'])
      .fetch();
    const tags = await $content('tags')
      .only(['name', 'slug'])
      .sortBy('name', 'asc')
      .fetch();
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author', 'created', 'updated'])
      .where({ tags: { $contains: tag.name } })
      .sortBy('updated', 'desc')
      .fetch();
    const projects = await $content('projects')
      .only(['title', 'description', 'img', 'slug', 'author', 'created', 'updated'])
      .where({ tags: { $contains: tag.name } })
      .sortBy('updated', 'asc')
      .fetch();

    articles.push(...projects);
    articles.sort((a, b) => (new Date(b.updated)) - (new Date(a.updated)));
    return {
      articles,
      tags,
      tag
    };
  }
};
</script>
