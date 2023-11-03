import * as shiki from 'shikiji';

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'coreyshuman.com',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Corey Shuman'
      },
      { name: 'msapplication-TileColor', content: '#37A1AE' },
      { name: 'theme-color', content: '#37A1AE' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/cs-favicon-16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/cs-favicon-32.png' },
      { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/cs-favicon-48.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/cs-favicon-96.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/cs-favicon-180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/cs-favicon-192.png' },
      { rel: 'msapplication-square310x310logo', type: 'image/png', sizes: '310x310', href: '/cs-favicon-310.png' },
      { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/cs-favicon-512.png' }
    ]
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/vue-rx.plugin.js'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          }
        ]
      }
    ]
  ],
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    markdown: {
      async highlighter() {
        const highlighter = await shiki.getHighlighter({
          // Complete themes: https://github.com/shikijs/shiki/tree/main/packages/shiki/themes
          themes: [import('./theme/theme.mjs')],
          langs: ['diff', 'json', 'js', 'ts', 'css', 'shell', 'html', 'md', 'yaml', 'csharp']
        });
        return (rawCode, lang, { lineHighlights, fileName }) => {
          const lineLights = parseNumberRange(lineHighlights);
          const header = fileName ? `<div class="nuxt-content-highlight-header">${fileName}</div>` : '';

          const code = highlighter.codeToHtml(rawCode, {
            lang: lang === 'null' ? 'md' : lang,
            theme: 'corey-theme',
            transforms: {
              line(node, line) {
                if (lineLights.includes(line)) {
                  node.properties.class += ' highlight';
                }
              }
            }
          });
          return header + code;
        };
      }
    },
    nestedProperties: ['author.name']
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    postcss: {
      plugins: {
        // 'postcss-preset-env':false
      },
      preset: {
        // Change the postcss-preset-env settings
        features: {
          'oklab-function': {
            preserve: true,
            subFeatures: {
              displayP3: true
            }
          }
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: '3000'
  }
};

function parseNumberRange(rangeStr) {
  const result = [];

  if (rangeStr === null) {
    return result;
  }

  // Split the string into parts separated by commas.
  const parts = rangeStr.split(',');

  for (const part of parts) {
    // Check if part is a range (e.g. "3-5").
    if (part.includes('-')) {
      // Split the range into start and end numbers.
      const range = part.split('-').map(Number);
      // Generate all numbers within this range and add to the result.
      for (let i = range[0]; i <= range[1]; i++) {
        result.push(i);
      }
    } else {
      // If it's not a range, simply add the number to the result.
      result.push(Number(part));
    }
  }

  return result;
}
