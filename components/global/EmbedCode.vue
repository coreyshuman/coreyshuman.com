<template>
  <div id="embed-code" class="animatedBorder relative grid grid-cols-1 lg:grid-cols-2 bg-darkblue bg-opacity-87">
    <div class="relative border-gray lg:border-r-2 border-b-2 lg:border-b-0">
      <div class="bg-darkblue h-8" role="tablist" tabindex="-1">
        <button
          v-for="lang in enabledLanguages"
          :id="'tab-'+lang"
          :key="lang"
          :class="activeTab === lang ? 'bg-red' : 'bg-green'"
          role="tab"
          :aria-selected="activeTab === lang"
          :aria-controls="lang"
          @click="nextActiveTab = lang"
        >
          {{ lang.toUpperCase() }}
        </button>
      </div>
      <div class="w-full h-88">
        <template v-for="lang in supportedLanguages">
          <Transition :key="lang" :name="swipeAnimation">
            <div
              v-show="activeTab === lang"
              :id="lang"
              :key="lang"
              role="tabpanel"
              :aria-labelledby="'tab-'+lang"
              class="codePanel absolute w-full"
            >
              <slot :name="lang"></slot>
            </div>
          </Transition>
        </template>
      </div>
    </div>
    <div class="bg-darkblue">
      <div class="bg-darkblue text-green h-8 p-2 mt-px border-gray border-b-1">{{ previewPanelTitle }}</div>
      <iframe
        ref="frameRef"
        :id="iframeId"
        :srcdoc="srcdoc"
        class="h-88 w-full pointer-events-auto"
        tabindex="0"
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      supportedLanguages: ['html', 'css', 'js'],
      dynamicLanguages: ['js'],
      enabledLanguages: [],
      activeTab: '',
      nextActiveTab: '',
      swipeAnimation: 'swipe-left',
      previewPanelTitle: 'Live Preview',
      iframeId: '',
      display: {
        html: 'Loading...',
        css: 'body{color:white}',
        js: '',
      }
    };
  },
  computed: {
    srcdoc() {
      // eslint-disable-next-line no-useless-escape
      return `<style>${this.display.css}<\/style>${this.display.html}<script>${this.display.js}<\/script>`;
    }
  },
  watch: {
    nextActiveTab(tab) {
      if(tab !== this.activeTab) {
        if(this.enabledLanguages.indexOf(tab) < this.enabledLanguages.indexOf(this.activeTab)) {
          this.swipeAnimation = 'swipe-right';
        } else {
          this.swipeAnimation = 'swipe-left';
        }
        this.activeTab = this.nextActiveTab;
      }
    }
  },
  mounted() {
    this.loadPanels();

    const uuid = new Uint32Array(2);
    crypto.getRandomValues(uuid);
    this.iframeId = 'i' + [...uuid].map(v => v.toString(16)).join('');
    document.addEventListener('mousemove', this.updateMousePosition);
    document.addEventListener('touchstart', this.updateMousePosition);
    document.addEventListener('touchmove', this.updateMousePosition);
    window.addEventListener('message', this.updateIframeMousePosition);

    this.updateMousePosition({clientX: 0, clientY: 0});

    this.activeTab = this.enabledLanguages[0];

    if(this.enabledLanguages.includes('html')) {
      this.display.html = this.parseCode('html');
    } else {
      this.display.html = '<div id="console"></div>';
    }

    if(this.enabledLanguages.includes('css')) {
      this.display.css = this.parseCode('css');
    } else {
      this.display.css = '#console{color: white;} #console span{} #console div::before{display: inline-block; margin-right:5px; content: "> "}';
    }

    for(const lang of this.dynamicLanguages) {
      if(this.enabledLanguages.includes(lang)) {
        this.loadDynamicCode(this.parseCode(lang), lang);
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.updateMousePosition);
    document.removeEventListener('touchstart', this.updateMousePosition);
    document.removeEventListener('touchmove', this.updateMousePosition);
    window.removeEventListener('message', this.updateIframeMousePosition);
  },
  methods: {
    parseCode(panelName) {
      let code = '';
      try {
        const lines = this.$el.querySelectorAll(`#${panelName} pre.shiki code span.line`);
        for(const line of lines) {
          const parts = line.querySelectorAll('span');
          for(const part of parts) {
            code += part.innerText;
          }
        }
      } catch(e) {
        console.error('Cannot parse code', e);
      }
      return code;
    },
    loadPanels() {
      try {
        for(const lang of this.supportedLanguages) {
          const lines = this.$el.querySelectorAll(`#${lang} pre.shiki code span.line`);
          if(lines.length && this.enabledLanguages.findIndex(item => item === lang) === -1) {
            this.enabledLanguages.push(lang);
          }
        }
      } catch(e) {
        console.error('Cannot load panels', e);
      }
    },
    loadDynamicCode(code, lang) {
      if(lang === 'js') {
        code = this.customJsPostMouse() + code;
        if(!this.enabledLanguages.includes('html')) {
          this.previewPanelTitle = 'Console Output';
          code = code.replace(/console/g, '_console');
          code = this.customJsConsole() + code;
        }
        this.display.js = code;
      }
    },
    customJsConsole() {
      return `const _cwrite = (s, p = '') => {let dd = document; let d = dd.createElement('div'); d.innerText = p+s; dd.getElementById('console').appendChild(d)}; const _console = {log: _cwrite, error: (s) => _cwrite(s, 'ERROR: ')};`;
    },
    customJsPostMouse() {
      return `window.addEventListener('mousemove', (e) => parent.postMessage({id:'${this.iframeId}', x: e.clientX, y: e.clientY},'*'));`;
    },
    updateMousePosition(e) {
      const {x, y} = this.$el.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;
      if(e.changedTouches) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else if(e.clientX) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      this.$el.style.setProperty("--x", `${clientX - x}px`);
      this.$el.style.setProperty("--y", `${clientY - y}px`);
    },
    updateIframeMousePosition(e) {
      const iframe = document.getElementById(e.data.id);
      if(iframe) {
        const {x, y} = iframe.getBoundingClientRect();
        const clientX = e.data.x + x;
        const clientY = e.data.y + y;
        this.updateMousePosition({clientX, clientY});
      }
    }
  }
}
</script>
<style scoped>
div#embed-code div {
  margin: 0 !important;
}

div#embed-code div.codePanel {
  @apply -mt-8 !important;
}

.animatedBorder::before {
  --border-width: 3px;
  --windowposition-width: calc(100% - 2 * var(--border-width));
  --windowposition-height: calc(100% - 2 * var(--border-width));

  position: absolute;
  content: "";
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  margin: -3px;
  background: radial-gradient(300px circle at var(--x) var(--y), var(--color-celeste) 0, transparent 100%) border-box;
  clip-path: polygon(
    0% 0%,
    0% 100%,
    var(--border-width) 100%,
    var(--border-width) var(--border-width),
    calc(var(--border-width) + calc(100% - 2 * var(--border-width))) var(--border-width),
    calc(var(--border-width) + calc(100% - 2 * var(--border-width))) calc(var(--border-width) + calc(100% - 2 * var(--border-width))),
    var(--border-width) calc(var(--border-width) + calc(100% - 2 * var(--border-width))),
    var(--border-width) 100%,
    100% 100%,
    100% 0%
  );
}

button {
  @apply relative h-8 w-16 border-black border-l-1 border-r-1 m-0 z-20 text-black font-bold hover:bg-celeste transition duration-300;
}

.swipe-left-enter-active, .swipe-left-leave-active,
.swipe-right-enter-active, .swipe-right-leave-active
{
  transition: .5s all ease;
}
.swipe-left-enter,
.swipe-right-leave-to {
  transform: translateX(300px);
  opacity: 0;
}

.swipe-left-leave-to,
.swipe-right-enter {
  transform: translateX(-300px);
  opacity: 0;
}
</style>
