<template>
  <header class="mb-5">
    <div class="flex flex-col sm:flex-row items-center">
      <NuxtLink to="/" class="flex flex-grow align-middle items-center w-full px-1 sm:p-0">
        <span class="flex align-middle text-xl">
          COREY
          <span class="font-semibold">SHUMAN</span>
          .COM
        </span>
      </NuxtLink>

      <HeaderNavMenu :links="links" />
    </div>
    <Separator />
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
