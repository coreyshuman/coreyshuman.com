<template>
  <div id="embed-code" class="grid grid-cols-1 lg:grid-cols-2 bg-darkblue bg-opacity-87">
    <div class="border-gray lg:border-r-2 border-b-2 lg:border-b-0">
      <div class="bg-darkblue h-8">
        <button :class="activeTab === 'html' ? 'bg-green' : 'bg-gray'" @click="activeTab = 'html'">Html</button>
        <button :class="activeTab === 'css' ? 'bg-green' : 'bg-gray'" @click="activeTab = 'css'">CSS</button>
        <button :class="activeTab === 'js' ? 'bg-green' : 'bg-gray'" @click="activeTab = 'js'">JS</button>
      </div>
      <div v-show="activeTab === 'html'" id="html" class="-mt-8">
        <slot name="code-html">default</slot>
      </div>
      <div v-show="activeTab === 'css'" id="css" class="-mt-8">
        <slot name="code-css">default</slot>
      </div>
      <div v-show="activeTab === 'js'" id="js" class="-mt-8">
        <slot name="code-js">default</slot>
      </div>
    </div>
    <div class="bg-darkblue">
      <div class="bg-darkblue h-8 p-2">Live Preview</div>
      <iframe :srcdoc="srcdoc" class="h-88 w-full"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeTab: 'html',
      html: 'Loading...',
      css: 'body{color:white}',
      js: '',
    };
  },
  computed: {
    srcdoc() {
      // eslint-disable-next-line no-useless-escape
      return `<style>${this.css}<\/style>${this.html}<script>${this.js}<\/script>`;
    }
  },
  beforeMount() {
    // const html = this.$scopedSlots['code-html']();
  },
  mounted() {
    let html = '';
    let css = '';
    let js = '';
    let lines = this.$el.querySelectorAll('#html pre.shiki code span.line');
    console.log(lines)
    for(const line of lines) {
      const parts = line.querySelectorAll('span');
      console.log(parts)
      for(const part of parts) {
        html += part.innerText;
      }
    }

    this.html = html;

    lines = this.$el.querySelectorAll('#css pre.shiki code span.line');
    console.log(lines)
    for(const line of lines) {
      const parts = line.querySelectorAll('span');
      console.log(parts)
      for(const part of parts) {
        css += part.innerText;
      }
    }

    this.css = css;

    lines = this.$el.querySelectorAll('#js pre.shiki code span.line');
    console.log(lines)
    for(const line of lines) {
      const parts = line.querySelectorAll('span');
      console.log(parts)
      for(const part of parts) {
        js += part.innerText;
      }
    }

    this.js = js;
  }
}
</script>
<style scoped>
button {
  @apply relative h-8 w-12 border-black border-l-1 border-r-1 m-0 z-20;
}

.nuxt-content-highlight {
  margin: 0 !important;
  margin-top: 0.5rem !important;
}
.nuxt-content-highlight pre {
  @apply h-88 overflow-x-auto overflow-y-auto;
}

#embed-code .nuxt-content-highlight pre {
  background-color: transparent !important;
}
</style>
