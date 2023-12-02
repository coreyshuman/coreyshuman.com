<template>
  <footer class="flex flex-grow items-end text-steel">
    <div class="flex flex-col w-screen">
      <Separator />
      <ul class="flex flex-row flex-1 m-2 md:m-4 justify-center text-green text-title text-lg">
        <li v-for="social of socials" :key="social.name" class="m-0 ml-1 sm:m-2">
          <a
            :href="social.url"
            class="
              flex-none
              bg-transparent
              font-semibold
              py-2
              px-1
              sm:px-4
              border
              border-green
              hover:border-transparent
              focus:border-transparent
              hover:bg-green
              focus:bg-green
              hover:text-black
              focus:text-black
              rounded
              transition
              duration-300
            "
          >
            <fa :icon="['fab', social.icon]" />
            {{social.name}}
          </a>
        </li>
      </ul>
      <p class="flex-1 text-center text-lg">Copyright © coreyshuman.com {{dateRange}}</p>
      <p class="flex-1 text-center text-xs text-gray">Version: {{ $config.clientVersion }}</p>
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
