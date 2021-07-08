<template>
  <div>
    <input
      v-model="searchQuery"
      type="search"
      autocomplete="off"
      placeholder="Search Articles"
      class="block w-64 pl-2 pr-3 py-2 truncate leading-5 placeholder-white border-white border-2 text-white focus:border-celeste rounded-md focus:outline-none bg-black bg-opacity-60"
    />
    <ul
      v-if="articles.length"
      class="z-10 w-auto absolute flex-1 top-40 bg-white dark:bg-gray rounded-md border border-gray overflow-hidden"
    >
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink
          :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          class="flex w-64 px-4 py-2 items-center leading-5 transition ease-in-out duration-150 text-blue hover:text-black"
        >
          <span v-html="highlightArticles(article.title)"></span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script>
import { from } from 'rxjs';
import {tap, pluck, debounceTime, switchMap} from 'rxjs/operators'

export default {
  data() {
    return {
      searchQuery: '',
      articles: []
    };
  },
  methods: {
      highlightArticles(title) {
        return highlight(title, this.searchQuery)
      }
  },
  subscriptions() {
    return {
      search$: this.$watchAsObservable('searchQuery').pipe(
        pluck('newValue'),
        switchMap(query => from(this.$content('articles').limit(6).search(query).fetch())),
        debounceTime(100),
        tap((results) => {this.articles = results}))
    };
  }
}

function highlight(value, query) {
      if(!value) {return;}
      if(!query) {return;}
      const valueLower = value.toLowerCase();
      query = query.toLowerCase();
      let output = '';
      for(let i = 0; i<value.length; i++) {
        if(valueLower[i] !== query[0]) {
          output += value[i];
          continue;
        }

        output += '<span class="font-bold">';
        let k = 0;
        do {
          output += value[i];
          k++;
          i++;
        } while(k < query.length && i < value.length && valueLower[i] === query[k]);
        output += '</span>';
        if(i < value.length) {
          output += value[i];
        }
      }
      return output;
    }
</script>
