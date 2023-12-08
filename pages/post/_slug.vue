<template>
  <article class="flex w-full flex-col text-white">
    <ArticleHeader :article="article" :tags="tags"></ArticleHeader>
    <div
      v-if="!article.published"
      class="w-full mt-4 p-4 bg-orange text-center text-2xl font-bold text-black uppercase"
    >
      This article is a draft
    </div>
    <div
      class="
        relative
        py-8 px-0
        xs:py-8 xs:px-2
        lg:py-16 lg:px-8 
        w-full
        h-full
      "
    >
      <em>{{ article.description }}</em>
      <p class="pb-4">Post last updated: {{ formatDate(article.updated) }}</p>
      <TableOfContents :toc="article.toc"></TableOfContents>
      <!-- content from markdown -->
      <nuxt-content :document="article" />
      <!-- prevNext component -->
      <PrevNext :prev="prev" :next="next" class="mt-8" />
    </div>
  </article>
</template>
<script>
import {util} from '../../util/util';

export default {
  mixins:[util],
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch();
    const tags = await $content('tags')
      .only(['name', 'slug'])
      .where({ name: { $containsAny: article.tags } })
      .fetch();
    let prev, next;
    if(process.env.NODE_ENV === 'production') {
      [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('created', 'asc')
      .where({published: {$eq: true}})
      .surround(params.slug)
      .fetch();
    } else {
      [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('created', 'asc')
      .surround(params.slug)
      .fetch();
    }

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

    function hexToRgb(hex) {
      if(typeof hex !== 'string' || hex.length === 0) {
        return 'rgb(0, 0, 0)';
      }

      if(hex[0] === 'r') {
        return hex;
      }

      if(hex[0] !== '#') {
        console.error(`Invalid color format: ${hex}`);
        return 'rgb(0, 0, 0)';
      }

      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      if(!result) {
        console.error(`Invalid color format: ${hex}`);
        return 'rgb(0, 0, 0)';
      }

      return `rgb(${parseInt(result[0])}, ${parseInt(result[1])}, ${parseInt(result[2])})`;
    }
    // update colors in code
    const tokens = document.querySelectorAll('pre.shiki code span.line span');

    for(const token of tokens) {
      const tokenColor = hexToRgb(token.style.color);
      switch(tokenColor) {
        case 'rgb(229, 231, 235)':
          token.style.color = 'var(--color-highlight-foreground)'; break;
        case 'rgb(255, 133, 119)':
          token.style.color = 'var(--color-highlight-string)'; break;
        case 'rgb(0, 150, 255)':
          token.style.color = 'var(--color-highlight-boolean)'; break;
        case 'rgb(166, 186, 188)':
          token.style.color = 'var(--color-highlight-punctuation)'; break;
        case 'rgb(0, 223, 159)':
          token.style.color = 'var(--color-highlight-number)'; break;
        case 'rgb(255, 215, 109)':
          token.style.color = 'var(--color-highlight-function)'; break;
        case 'rgb(255, 215, 108)':
          token.style.color = 'var(--color-highlight-attribute)'; break;
        case 'rgb(0, 223, 158)':
          token.style.color = 'var(--color-highlight-type)'; break;
        case 'rgb(229, 231, 234)':
          token.style.color = 'var(--color-highlight-property)'; break;
        case 'rgb(0, 122, 130)':
          token.style.color = 'var(--color-highlight-comment)'; break;
        case 'rgb(0, 150, 254)':
          token.style.color = 'var(--color-highlight-keyword)'; break;
        case 'rgb(255, 113, 253)':
          token.style.color = 'var(--color-highlight-storage)'; break;
        case 'rgb(73, 235, 255)':
          token.style.color = 'var(--color-highlight-operator)'; break;
        case 'rgb(255, 58, 91)':
          token.style.color = 'var(--color-highlight-other)'; break;
        case 'rgb(203, 143, 41)':
          token.style.color = 'var(--color-highlight-object)'; break;
        case 'rgb(160, 107, 255)':
          token.style.color = 'var(--color-highlight-control)'; break;
        default:
          console.error(`Unknown color: ${tokenColor}`);
          break;
      }
    }
  }
};
</script>
<style>
.nuxt-content {
  color: white;
}
</style>
