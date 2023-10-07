<template>
  <header class="flex flex-col sm:flex-row items-center border-gray border-b-2 mb-5">
    <NuxtLink to="/" class="flex flex-grow align-middle items-center w-full">
      <span class="flex align-middle text-xl">
        COREY
        <span class="font-semibold">SHUMAN</span>
        .COM
      </span>
    </NuxtLink>

    <HeaderNavMenu :links="links" />
  </header>
</template>
<script>
export default {
  data() {
    return {
      linkStatic: [
        {name: 'About', url: '/about', shown: true},
        {name: 'Projects', url: '/project', shown: true},
        {name: 'Articles', url: '/post', shown: true},
      ]
    }
  },
  computed: {
    links() {
      return this.linkStatic.filter(item => item.shown).map((link) => { return {...link, selected: this.$route.path.includes(link.url)}})
    }
  }
}
</script>
