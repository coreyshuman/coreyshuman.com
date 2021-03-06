/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
 const plugin = require("tailwindcss/plugin");


module.exports = {
  mode: 'jit',
  theme: {
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxlmin: '1351px',
      xxlmax: { max: '1350px' }
    },
    fontFamily: {
      title: ['Quicksand', 'Helvetica Neue', 'sans-serif'],
      body: ['Montserrat', 'Arial', 'sans-serif']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      red: '#c33c54',
      indigo: '#254e70',
      blue: '#37718e',
      green: '#42dca3',
      teal: '#8ee3ef',
      celeste: '#aef3e7',
      steel: '#e5e7eb',
      gray: '#6b7280',
      black: '#000',
      white: '#fff'
    },
    borderWidth: {
      default: '1px',
      0: '0',
      2: '2px',
      4: '4px'
    },
    minHeight: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
      fullvh: '100vh'
    },
    extend: {
      opacity: {
        10: '.1',
        20: '.2',
        30: '.3',
        40: '.4',
        60: '.6',
        70: '.7',
        80: '.8',
        90: '.9'
      },
      spacing: {
        96: '24rem',
        128: '32rem'
      },
      height: {
        84: '22rem'
      },
      width: {
        '3/2': '150%',
        '4/2': '200%',
        '1/2-screen': '50vw'
      },
      margin: {
        '-fullh': '-100vh'
      },
      animation: {
        'button-hover': 'transition all .3s ease-in-out'
      }
    },
    inset: {
      0: 0,
      16: '16px',
      32: '32px',
      64: '64px',
      '2rem': '2rem',
      '3rem': '3rem'
    }
  },
  variants: {},
  plugins: [
    // firefox conditional: https://gist.github.com/samselikoff/b3c5126ee4f4e69e60b0af0aa5bfb2e7
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
  ],
};
