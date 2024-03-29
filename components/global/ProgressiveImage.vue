<template>
  <div :class="loaderClass" style="cursor:pointer" :style="loaderStyle">
    <img
      v-show="ready"
      :id="id"
      ref="img"
      :src="imageSrc"
      :alt="alt"
      :class="calcImageClass"
      :style="imageStyle"
      loading="lazy"
      role="button"
      :tabindex="tabindex"
      @click="clickImage"
      @keypress="onKeyPress"
    />
    <div v-show="loading" class="loader"></div>
  </div>
</template>

<script>
import assets from '../../assets/js/images';
import {Keycode} from '../../util/constant';
import { util } from '~/util/util';

  export default {
    mixins:[util],
    props: {
      src: {
        type: String,
        required: true
      },
      alt: {
        type: String,
        required: true
      },
      width: {
        type: String,
        default: ''
      },
      height: {
        type: String,
        default: ''
      },
      blur: {
        type: String,
        default: ''
      },
      loadingBlur: {
        type: String,
        default: '4px'
      },
      size: {
        type: String,
        default: 'medium'
      },
      // cover, contain, fill, none
      fit: {
        type: String,
        default: 'cover'
      },
      imageClass: {
        type: String,
        default: ''
      },
      radius: {
        type: String,
        default: ''
      },
      mosaic: {
        type: Boolean,
        default: false
      },
      tabindex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        id: 0,
        image: null,
        loading: true,
        ready: false,
        error: false,
        thumbnail: '',
        imageSrc: '',
        w: '100%',
        h: '100%',
        ratio: 0,
      };
  },
    computed: {
      loaderStyle() {
        let style = `width:${this.mosaic ? 'auto': '100%'}; height:100%; min-height:${this.mosaic ? this.h: '100px'}; max-width:${this.w}; max-height:${this.h}; background-position:center; background-repeat:no-repeat; background-size:${this.backgroundSize};`;
        if(this.loading) {
          style += `filter:blur(${this.loadingBlur});`;
        }
        if(this.radius !== '') {
          style += `border-radius:${this.radius};`;
        }
        if(this.thumbnail) {
          style += `background-image:url("${this.thumbnail}");`;
        } else {
          style += `background:linear-gradient(186deg, rgba(43,43,43,1) 0%, rgba(0,0,0,1) 54%, rgba(59,59,59,1) 100%);`;
        }
        if(this.ratio) {
          style += `aspect-ratio:${this.ratio};`;
        }
        return style;
      },
      loaderClass() {
        return `thumbnail ${this.loading ? 'loading' : ''}`;
      },
      imageStyle() {
        let style = `object-fit:${this.imageFit};`;
        if(this.blur) {
          style += `filter:blur(${this.blur});`;
        }
        if(this.radius !== '') {
          style += `border-radius:${this.radius}`;
        }
        return style;
      },
      calcImageClass() {
        return this.imageClass;
      },
      imageFit() {
        let fit = 'none';

        switch(this.fit) {
          case 'cover':
          case 'contain':
          case 'fill':
          fit = this.fit;
        }
        return fit;
      },
      backgroundSize() {
        let fit = 'auto';

        switch(this.fit) {
          case 'cover':
          case 'contain':
          fit = this.fit;
            break;
          case 'fill':
          fit = '100% 100%';
        }
        return fit;
      }
    },
    watch: {
      src(newSrc) {
        this.loadImageFromAssets(newSrc);
      }
    },
    beforeMount() {
      this.loadImageFromAssets(this.src);
      this.id = this.calculateHashString(this.src, this.size, this.tabindex);
    },
    mounted() {
      const imageEl = this.$el.querySelector('img');
      imageEl.addEventListener('load', this.onLoad);
      imageEl.addEventListener('error', this.onError);
      this.ready = true;
    },
    beforeDestroy() {
      const imageEl = this.$el.querySelector('img');
      imageEl.removeEventListener('load', this.onLoad);
      imageEl.removeEventListener('error', this.onError);
    },
    methods: {
      onLoad() {
        this.loading = false;
        this.thumbnail = '';
      },
      onError() {
        if(!this.error && this.ready) {
          console.error(`Image '${this.imageSrc}' not found.`);

          this.thumbnail = '';
          this.ready = false;
          this.loading = false;
          this.error = true;
        }
      },
      onKeyPress(ev) {
        if(ev.keyCode === Keycode.enter || ev.keyCode === Keycode.space) {
          ev.preventDefault();
          ev.target.blur();
          this.clickImage();
        }
      },
      loadImageFromAssets(src) {
        const images = assets.images;
        let tempSrc = src;

        // remove leading / from image asset name
        if(src && src[0] === '/') {
          tempSrc = src.substring(1);
        }
        this.image = images.find(img => img.src === tempSrc);

        let size = 'medium';
        switch(this.size) {
          case 'large':
          case 'source':
          case 'src':
            size = 'large'
            break;
          case 'medium':
          case 'med':
            size = 'medium';
            break;
          case 'thumb':
            size = 'thumb';
            break;
        }

        this.loading = true;

        if(this.width) {
          this.w = this.width;
        }

        if(this.height) {
          this.h = this.height;
        }


        if(this.image) {
          const sizedImage = this.image.generated[size];
          this.thumbnail = this.image.generated.thumb.data;
          this.ratio = sizedImage.width / sizedImage.height;
          this.imageSrc = sizedImage.url;

          if(this.width === '') {
            this.w = sizedImage.width + 'px';
          }
          if(this.height === '') {
            this.h = sizedImage.height + 'px';
          }
        } else {
          if(this.width === '') {
            this.w = '300px';
          }
          if(this.h === '100%' || this.h === '') {
            this.ratio = 1.2;
          }
        }
      },
      clickImage() {
        const imageEl = this.$el.querySelector('img');
        if(this.image && imageEl) {
          const location = imageEl.getBoundingClientRect();
          this.$root.$emit('lightboxLoad', {
            images: [{
              image: this.image,
              id: this.id,
              alt: this.alt,
              ref: this.$refs.img
            }],
            index: 0,
            location
          });
        }
      }
    }
  };
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
}

div.loading div.loader {
  border: 0.3em solid rgba(255, 255, 255, 1);
  border-top: 0.3em solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  width: 4em;
  height: 4em;
  animation: spin 1.1s linear infinite;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  20% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
