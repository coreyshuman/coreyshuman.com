<template>
  <div @focusout="onFocusOut">
    <label v-show="false" id="search-label" for="search-input">Search Articles</label>
    <input
      id="search-input"
      v-model="searchQuery"
      type="search"
      autocomplete="off"
      placeholder="Search Articles"
      class="block xs:w-60 sm:w-64 pl-2 pr-3 py-2 truncate leading-5 placeholder-white border-white border-2 text-white focus:border-green rounded-md focus:outline-none bg-black bg-opacity-60"
      role="combobox"
      aria-labelledby="search-label"
      aria-autocomplete="list"
      aria-controls="search-menu"
      :aria-activedescendant="articles.length ? 'option-'+selectedIdx : null"
      :aria-expanded="searchQuery.length ? 'true' : 'false'"
      @keydown="onKeyDown"
    />
    <ul
      v-if="articles.length && searchQuery"
      id="search-menu"
      class="z-10 xs:w-60 sm:w-64 absolute flex-1 bg-black bg-opacity-60 rounded-md border-2 border-white overflow-hidden"
      role="listbox"
      @mousedown.prevent
    >
      <li
        v-for="(article, index) of articles"
        :id="'option-'+index"
        :key="article.slug"
        :class="{selected: selectedIdx === index}"
        role="option"
        @click="searchQuery=''"
        @keydown="onKeyDown"
        @mouseover="selectedIdx = index"
        @focusin="selectedIdx = index"
      >
        <NuxtLink
          id="search-link"
          :to="{ name: 'post-slug', params: { slug: article.slug } }"
          class="flex w-64 px-4 py-2 items-center leading-5"
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
import { Keycode } from '~/util/constant.mjs';

export default {
  data() {
    return {
      searchQuery: '',
      articles: [],
      selectedIdx: 0,
      skipNextFocusOut: false
    };
  },
  watch: {
    articles() {
      this.selectedIdx = 0;
    }
  },
  methods: {
    onKeyDown(ev) {
      let article = null;
      switch(ev.keyCode) {
        case Keycode.arrowDown:
          ev.preventDefault();
          this.selectedIdx ++;
          if(this.selectedIdx >= this.articles.length) {
            this.selectedIdx = 0;
          }
          break;

        case Keycode.arrowUp:
          ev.preventDefault();
          this.selectedIdx --;
          if(this.selectedIdx < 0) {
            this.selectedIdx = this.articles.length ? this.articles.length - 1 : 0;
          }
          break;

        case Keycode.enter:
          ev.preventDefault();
          article = this.articles.length ? this.articles[this.selectedIdx] : null;
          if(article) {
            this.$router.push(article.slug);
          }
          break;

        case Keycode.tab:
          if(ev.target.id === 'search-input' && !ev.shiftKey) {
            this.skipNextFocusOut = true;
          } else if(ev.target.id === 'search-link' && !(this.selectedIdx === this.articles.length - 1 && !ev.shiftKey)) {
            this.skipNextFocusOut = true;
          }
      }
    },
    onFocusOut() {
      if(this.skipNextFocusOut) {
        this.skipNextFocusOut = false;
        return;
      }
      this.searchQuery = '';
    },
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
<style scoped>
li {
  @apply transition ease-in-out duration-150 text-white;
}
li.selected {
  @apply text-green bg-metal;
}
</style>
