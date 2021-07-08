<template>
  <footer class="flex w-100 flex-col border-gray border-t-2 text-white">
    <ul class="flex flex-row flex-1 m-4 justify-center text-green text-title text-lg">
      <li v-for="social of socials" :key="social.name" class="m-2">
        <a
          :href="social.url"
          class="flex-none bg-transparent hover:bg-green text-blue-700 font-semibold hover:text-black py-2 px-4 border border-green hover:border-transparent rounded transition duration-300"
        >
          <fa-layers class="fa-1x">
            <fa :icon="['fab', social.icon]" />
          </fa-layers>
          {{social.name}}
        </a>
      </li>
    </ul>
    <p class="flex-1 m-4 justify-center text-center text-lg">Copyright © coreyshuman.com {{dateRange}}</p>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      socials: [
        {name: 'TWITTER', icon:'twitter', url: 'https://twitter.com/coreyshuman'},
        {name: 'LINKEDIN', icon:'linkedin', url: 'https://www.linkedin.com/in/coreyshuman'},
        {name: 'GITHUB', icon:'github', url: 'https://github.com/coreyshuman'},
      ]
    }
  },
  computed: {
    dateRange() {
      return '2016 - ' + (new Date()).getFullYear();
    }
  }
}
</script>
