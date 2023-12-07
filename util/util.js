export const util = {
  methods: {
    formatDate(date) {
      if (!date) {
        return '';
      }

      const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
      return new Date(date).toLocaleDateString('en', options);
    },
    calculateHash() {
      let hash = 0xfac3d4de;
      for (let i = 0; i < arguments.length; i++) {
        const arg = arguments[i];
        if (typeof arg === 'number') {
          hash = Math.imul(hash ^ arg, 0xc2b2ae35);
        } else if (typeof arg === 'string') {
          for (const c of arg) {
            hash = Math.imul(hash ^ c.charCodeAt(0), 0xc2b2ae35);
          }
        } else if (typeof arg === 'boolean') {
          hash = Math.imul(hash ^ ((arg + 0xfac3d4de) >>> 5), 0xc2b2ae35);
        } else if (typeof arg === 'symbol' || typeof arg === 'bigint') {
          hash = this.calculateHash(hash, arg.toString());
        } else if (typeof arg === 'object') {
          if (Array.isArray(arg)) {
            for (const val of arg) {
              hash = this.calculateHash(hash, val);
            }
          } else {
            for (const param of arg) {
              if (Object.prototype.hasOwnProperty.call(arg, param)) {
                hash = this.calculateHash(hash, param);
                hash = this.calculateHash(hash, arg[param]);
              }
            }
          }
        } else if (typeof arg === 'function') {
          hash = this.calculateHash(hash, arg.call());
        }
      }

      return hash ^ (hash >>> 13);
    },
    calculateHashString() {
      const hash = this.calculateHash(...arguments);
      return Math.abs(hash).toString(16).padEnd(8, '0');
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
    },

    canvasSupportsOklchColors() {
      const context = document.createElement('canvas').getContext('2d');
      const initialFillStyle = context.fillStyle;
      context.fillStyle = 'oklch(100% 0 0)';
      return context.fillStyle !== initialFillStyle;
    },

    oklchToOklab(L, C, H) {
      const a = C * Math.cos((H * Math.PI) / 180);
      const b = C * Math.sin((H * Math.PI) / 180);
      return [L, a, b];
    },

    oklabToXYZ(L, a, b) {
      // Convert L, a, b to l, m, s
      const l = 0.9999999984505198 * L + 0.3963377921737679 * a + 0.2158037580607588 * b;
      const m = 1.000000008881761 * L - 0.1055613423236563 * a - 0.0638541747717059 * b;
      const s = 1.000000054672411 * L - 0.0894841820949658 * a - 1.291485537864092 * b;

      // Convert from the log-scaled values to linear light values
      const l3 = Math.pow(l, 3);
      const m3 = Math.pow(m, 3);
      const s3 = Math.pow(s, 3);

      // Matrix multiplication to convert lms to XYZ
      // This matrix is based on the D65 illuminant
      const X = 1.2268798733741557 * l3 - 0.5578149965554813 * m3 + 0.2813910501772158 * s3;
      const Y = -0.0405757626243137 * l3 + 1.1122868293970594 * m3 - 0.071711066661517 * s3;
      const Z = -0.0763729497467214 * l3 - 0.4214933239627914 * m3 + 1.5869240244272418 * s3;

      return [X, Y, Z];
    },

    xyzToP3(X, Y, Z) {
      // Matrix conversion from XYZ (D65) to linear Display P3.
      // The matrix is based on the D65 illuminant.
      const p3Red = 2.493496911941425 * X - 0.9313836179191236 * Y - 0.4027107844507168 * Z;
      const p3Green = -0.829488969561575 * X + 1.762664060318347 * Y + 0.0236246858419436 * Z;
      const p3Blue = 0.0358458302437843 * X - 0.0761723892680417 * Y + 0.9568845240076873 * Z;

      return [p3Red, p3Green, p3Blue];
    },

    oklchToP3(color) {
      const [L, C, H] = this.parseOklch(color);
      const [Loklab, a, b] = this.oklchToOklab(L, C, H);
      const [X, Y, Z] = this.oklabToXYZ(Loklab, a, b);
      const p3 = this.xyzToP3(X, Y, Z);

      // low-tech gamma correction, done by hand / eye
      // not meant to be perfect, just makes actively used colors 'good enough'
      // for what is effectively an edge case anyways
      p3.forEach((val, idx) => {
        if (val < 0.01) {
          p3[idx] = val * [20, 15, 30][idx];
        } else if (val < 0.05) {
          p3[idx] = val * [7, 5, 8.5][idx];
        } else if (val < 0.1) {
          p3[idx] = val * [2, 2, 2][idx];
        } else if (val < 0.6) {
          p3[idx] = val * [1.3, 1.2, 1.1][idx];
        } else if (val < 0.99) {
          p3[idx] = val * [1, 0.95, 0.9][idx];
        }
      });

      const [pR, pG, pB] = p3;
      return `color(display-p3 ${pR} ${pG} ${pB})`;
    },

    parseOklch(oklchString) {
      const match = this.isOklchColor(oklchString);
      if (match) {
        const L = parseFloat(match[1]) / 100;
        const C = parseFloat(match[2]);
        const H = parseFloat(match[3]);
        return [L, C, H];
      } else {
        throw new Error('Invalid oklch format');
      }
    },

    isOklchColor(color) {
      if (typeof color !== 'string') {
        return false;
      }

      return color.match(/^oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)$/);
    }
  }
};
