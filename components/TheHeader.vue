<template>
  <header class="flex font-title font-medium text-white items-center border-gray border-b-2">
    <NuxtLink to="/" class="flex align-middle items-center">
      <span class="flex align-middle text-xl">COREY<span class="font-semibold">SHUMAN</span>.COM</span>
    </NuxtLink>
    <AppSearchInput class="ml-8" />
    <span class="flex-1 justify-end pr-10">
      <ul class="flex m-4 justify-end text-green text-title text-xl">
        <li v-for="link of links" :key="link.name" class="m-2">
          <NuxtLink
            v-if="link.selected"
            :to="link.url"
            class="flex align-middle items-center text-teal font-bold border-b-1 border-green"
          >
            {{link.name}}
          </NuxtLink>
          <NuxtLink v-else :to="link.url" class="flex align-middle items-center hover:text-red transition duration-300">
            {{link.name}}
          </NuxtLink>
        </li>
      </ul>
    </span>
  </header>
</template>
<script>
export default {
  data() {
    return {
      linkStatic: [
        {name: 'About', url: '/about'},
        {name: 'Projects', url: '/projects'},
        {name: 'Blog', url: '/blog'},
      ]
    }
  },
  computed: {
    links() {
      return this.linkStatic.map((link) => { return {...link, selected: this.$route.path.includes(link.url)}})
    }
  }
}
</script>
