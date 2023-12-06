<template>
  <div class="text-steel font-body">
    <NuxtLink to="/post"
      ><p class="text-celeste font-bold hover:text-red transition duration-300">Back to All Articles</p></NuxtLink
    >
    <h1 class="mb-3 text-title font-bold text-4xl">
      Articles and Projects tagged <span class="text-purple uppercase">{{ tag.name }}</span
      >:
    </h1>
    <BlogCardList :articles="articles" />
    <h1 class="text-title font-bold text-4xl mb-3">Topics</h1>
    <div
      v-if="tags"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-items-stretch gap-y-2 gap-x-3 mb-8"
    >
      <CategoryPill v-for="(tag, id) in tags" :key="id" :tag="tag"></CategoryPill>
    </div>
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
      .only(['title', 'description', 'img', 'alt', 'slug', 'author', 'created', 'updated'])
      .where({ tags: { $contains: tag.name } })
      .sortBy('updated', 'desc')
      .fetch();
    const projects = await $content('projects')
      .only(['title', 'description', 'img', 'alt', 'slug', 'author', 'created', 'updated'])
      .where({ tags: { $contains: tag.name } })
      .sortBy('updated', 'asc')
      .fetch();

    // merge projects with articles and sort
    articles.forEach((item) => {item.type = 'post'});
    projects.forEach((item) => {item.type = 'project'});
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
