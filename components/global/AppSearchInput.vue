<template>
  <div>
    <input
      v-model="searchQuery"
      type="search"
      autocomplete="off"
      placeholder="Search Articles"
      class="block xs:w-60 sm:w-64 pl-2 pr-3 py-2 truncate leading-5 placeholder-white border-white border-2 text-white focus:border-green rounded-md focus:outline-none bg-black bg-opacity-60"
      @blur.prevent="searchQuery=''"
    />
    <ul
      v-if="articles.length && searchQuery"
      class="z-10 xs:w-60 sm:w-64 absolute flex-1 top-40 bg-black bg-opacity-60 rounded-md border-2 border-white overflow-hidden"
      @mousedown.prevent
    >
      <li v-for="article of articles" :key="article.slug" @click="searchQuery=''">
        <NuxtLink
          :to="{ name: 'post-slug', params: { slug: article.slug } }"
          class="flex w-64 px-4 py-2 items-center leading-5 transition ease-in-out duration-300 text-white hover:text-green"
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
        return this.highlight(title, this.searchQuery)
      },
      highlight(value, query) {
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

          output += '<span class="font-bold text-red">';
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
</script>
