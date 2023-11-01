export const util = {
  methods: {
    formatDate(date) {
      if (!date) {
        return '';
      }

      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    },
    displaySupportsP3Color() {
      return matchMedia('(color-gamut: p3)').matches;
    },
    canvasSupportsDisplayP3() {
      const canvas = document.createElement('canvas');
      try {
        // Safari throws a TypeError if the colorSpace option is supported, but
        // the system requirements (minimum macOS or iOS version) for Display P3
        // support are not met.
        const context = canvas.getContext('2d', { colorSpace: 'display-p3' });
        return context.getContextAttributes().colorSpace === 'display-p3';
      } catch {}
      return false;
    },
    canvasSupportsWideGamutCSSColors() {
      const context = document.createElement('canvas').getContext('2d');
      const initialFillStyle = context.fillStyle;
      context.fillStyle = 'color(display-p3 0 1 0)';
      return context.fillStyle !== initialFillStyle;
    }
  }
};
