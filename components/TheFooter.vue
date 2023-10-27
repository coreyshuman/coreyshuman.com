<template>
  <footer class="text-steel">
    <div class="flex w-100 flex-col ">
      <Separator />
      <ul class="flex flex-row flex-1 m-4 justify-center text-green text-title text-lg">
        <li v-for="social of socials" :key="social.name" class="m-0 sm:m-2">
          <a
            :href="social.url"
            class="flex-none bg-transparent hover:bg-green font-semibold hover:text-black py-2 px-4 border border-green hover:border-transparent rounded transition duration-300"
          >
            <fa-layers class="fa-1x">
              <fa :icon="['fab', social.icon]" />
            </fa-layers>
            {{social.name}}
          </a>
        </li>
      </ul>
      <p class="flex-1 m-4 justify-center text-center text-lg">Copyright © coreyshuman.com {{dateRange}}</p>
    </div>
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
      return '2015 - ' + (new Date()).getFullYear();
    }
  }
}
</script>
