/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const plugin = require('tailwindcss/plugin');

const colorWithOpacity = (colorName) => {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `oklch(var(${colorName}-raw) / ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `oklch(var(${colorName}-raw) / var(${opacityVariable}, 1))`;
    }
    return `oklch(var(${colorName}-raw))`;
  };
};

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
      body: ['Montserrat', 'Arial', 'sans-serif'],
      mono: [
        'Monaspace Neon',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace'
      ]
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colorWithOpacity('--color-black'),
      gray: colorWithOpacity('--color-gray'),
      white: colorWithOpacity('--color-white'),
      metal: colorWithOpacity('--color-metal'),
      silver: colorWithOpacity('--color-silver'),
      steel: colorWithOpacity('--color-steel'),
      darkblue: colorWithOpacity('--color-darkblue'),
      ocean: colorWithOpacity('--color-ocean'),
      blue: colorWithOpacity('--color-blue'),
      teal: colorWithOpacity('--color-teal'),
      celeste: colorWithOpacity('--color-celeste'),
      green: colorWithOpacity('--color-green'),
      darkgreen: colorWithOpacity('--color-darkgreen'),
      yellow: colorWithOpacity('--color-yellow'),
      gold: colorWithOpacity('--color-gold'),
      orange: colorWithOpacity('--color-orange'),
      red: colorWithOpacity('--color-red'),
      purple: colorWithOpacity('--color-purple'),
      lavender: colorWithOpacity('--color-lavender')
    },
    borderWidth: {
      default: '1px',
      1: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px'
    },
    minHeight: {
      0: '0',
      60: '15rem',
      '1/4': '25%',
      '1/3': '33%',
      '1/2': '50%',
      '2/3': '67%',
      '3/4': '75%',
      full: '100%',
      fullvh: '100vh'
    },
    minWidth: {
      12: '3rem'
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
        87: '.87',
        90: '.9'
      },
      spacing: {
        96: '24rem',
        128: '32rem'
      },
      height: {
        '3px': '3px',
        84: '22rem',
        88: '23rem'
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
      },
      dropShadow: {
        dark: '0 4px 3px rgba(0, 0, 0, 0.9)'
      },
      transitionProperty: {
        lightbox: 'width, height, top, bottom, left, right'
      }
    }
  },
  variants: {},
  plugins: [
    // firefox conditional: https://gist.github.com/samselikoff/b3c5126ee4f4e69e60b0af0aa5bfb2e7
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()'
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(`firefox${separator}${rule.selector.slice(1)}`)}`;
        });
      });
    })
  ]
};
