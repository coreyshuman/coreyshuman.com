<template>
  <div
    v-if="showLightbox"
    @wheel.prevent="wheelEvent"
    @touchmove.prevent
    @scroll.prevent
    @click.self="close"
    @mouseup="mouseUpEvent"
    @mousemove="mouseMoveEvent"
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 text-steel"
  >
    <div v-if="imageCount > 1" class="absolute z-40 text-silver top-10 left-12 font-bold filter drop-shadow-dark">
      {{ imageIndex + 1 }} / {{ imageCount }}
    </div>

    <div
      @click="close"
      class="absolute z-50 text-3xl text-silver top-10 right-12 opacity-70 hover:opacity-100 hover:text-red transition duration-300"
    >
      <fa class="filter drop-shadow-dark" :icon="['fa', 'times-circle']" />
    </div>

    <div
      v-if="imageCount > 1"
      @click.prevent="prev"
      class="absolute flex flex-wrap justify-center content-center z-40 text-5xl text-silver w-36 top-0 bottom-0 left-0 opacity-70 hover:opacity-100 hover:text-green transition duration-300"
    >
      <fa class="filter drop-shadow-dark" :icon="['fa', 'arrow-alt-circle-left']" />
    </div>

    <div
      v-if="imageCount > 1"
      @click.prevent="next"
      class="absolute flex flex-wrap justify-center content-center z-40 text-5xl text-silver w-36 top-0 bottom-0 right-0 opacity-70 hover:opacity-100 hover:text-green transition duration-300"
    >
      <fa class="filter drop-shadow-dark" :icon="['fa', 'arrow-alt-circle-right']" />
    </div>

    <div
      @click.self="close"
      id="imageContainer"
      class="flex flex-wrap justify-center content-center"
      :class="containerClass"
      :style="containerStyle"
    >
      <img
        v-show="ready"
        @mousedown.prevent="mouseDownEvent"
        @load="loadEvent"
        :src="imageSrc"
        :style="imageStyle"
        :alt="alt"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      containerStyle: {
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '0px',
        height: '0px',
        opacity: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      },
      imageStyle: {
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        transform: 'scale(1)'
      },
      containerClass: [],
      imageAssets: [],
      imageCount: 0,
      imageIndex: 0,
      showLightbox: false,
      loading: false,
      ready: false,
      imageSrc: '',
      alt: '',
      zoom: 1000,
      translate: {
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        x: 0,
        y: 0
      },
      isDragging: false
    }
  },
  created() {
    this.$root.$on('lightboxLoad', ({images, index, location}) => {
      if(images && images[index]) {
        this.imageAssets = images;
        this.imageCount = images.length;
        this.imageIndex = index;
        this.show(images[index], location);
      }
    });
  },
  mounted() {
    document.addEventListener('keydown', this.keyDownEvent);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keyDownEvent);
  },
  watch: {
    zoom(zoomVal) {
      this.imageStyle.transform = `scale(${zoomVal / 1000}) translate(${this.translate.x / (zoomVal / 1000)}px, ${this.translate.y / (zoomVal / 1000)}px)`;
    },
    translate: {
      handler(translateVal, oldVal) {
        this.imageStyle.transform = `scale(${this.zoom / 1000}) translate(${translateVal.x / (this.zoom / 1000)}px, ${translateVal.y / (this.zoom / 1000)}px)`;
      },
      deep: true
    }
  },
  methods: {
    show(image, location) {
      this.translate.lastX = this.translate.x = 0;
      this.translate.lastY = this.translate.y = 0;
      this.zoom = 1000;

      // set image to location
      // this.containerStyle.inset = '';
      this.containerStyle.left = `${location.left}px`;
      this.containerStyle.top = `${location.top}px`;
      this.containerStyle.right = `${location.right}px`;
      this.containerStyle.bottom = `${location.bottom}px`;
      this.containerStyle.width = `${location.width}px`;
      this.containerStyle.height = `${location.height}px`;
      this.containerStyle.opacity = 0.2;
      this.showLightbox = true;

      // set image
      this.containerStyle.backgroundImage = `url(${image.image.generated.thumb.data})`;
      if(image.image.width > window.innerWidth || image.image.height > window.innerHeight) {
        this.containerStyle.backgroundSize = 'contain';
      } else {
        this.containerStyle.backgroundSize = `${image.image.width}px ${image.image.height}px`;
      }
      this.loading = true;
      this.imageSrc = image.image.src;
      this.alt = image.alt;
      this.imageStyle.maxWidth = `${image.image.width}px`;
      this.imageStyle.maxHeight = `${image.image.height}px`;
      this.ready = true;

      // allow div location to set on page, then we will animate it's movement
      // use setTimeout to wait for page to update since we want animation to *start* from the above location
      // nextTick() doesn't work here since it only waits for shadow dom update.
      // onUpdated() isn't available in Vue 2

      setTimeout(() => {
        this.$root.$emit('stopConstellation');

        // set image dimensions and opacity
        this.containerClass.push('transition-lightbox duration-500');
        this.containerStyle.left = '0';
        this.containerStyle.top = '0';
        this.containerStyle.right = '0';
        this.containerStyle.bottom = '0';
        this.containerStyle.width = '100%';
        this.containerStyle.height = '100%';
        this.containerStyle.opacity = 1;

        setTimeout(() => {
          // animation done
          this.containerClass.pop();
          this.$root.$emit('startConstellation');
        }, 500);
      }, 2);

    },
    next() {
      if(this.imageCount < 2) {
        return;
      }

      if(++this.imageIndex >= this.imageCount) {
        this.imageIndex = 0;
      }

      this.updateImage();
    },
    prev() {
      if(this.imageCount < 2) {
        return;
      }

      if(--this.imageIndex < 0) {
        this.imageIndex = this.imageCount - 1;
      }

      this.updateImage();
    },
    updateImage() {
      this.translate.lastX = this.translate.x = 0;
      this.translate.lastY = this.translate.y = 0;
      this.zoom = 1000;

      const image = this.imageAssets[this.imageIndex];
      this.loading = true;
      this.imageSrc = image.image.src;
      this.alt = image.alt;
      this.imageStyle.maxWidth = `${image.image.width}px`;
      this.imageStyle.maxHeight = `${image.image.height}px`;
      this.ready = true;
    },
    close() {
      this.showLightbox = false;
      this.ready = false;
    },
    loadEvent(e) {
      if(this.loading) {
        this.loading = false;
        this.containerStyle.backgroundImage = '';
      }
    },
    keyDownEvent(e) {
      if(e.keyCode === 27) {
        if(this.showLightbox) {
          this.close();
        }
      }
    },
    wheelEvent(e) {
      if(e.deltaY < 0 && this.zoom < 5000) {
        this.zoom -= e.deltaY;
      }
      else if(e.deltaY > 0 && this.zoom > 1000) {
        this.zoom -= e.deltaY;
        if(this.zoom < 1000) {
          this.zoom = 1000;
        }
      }
    },
    mouseDownEvent(e) {
      this.isDragging = true;
      this.translate.startX = e.screenX;
      this.translate.startY = e.screenY;
    },
    mouseUpEvent(e) {
      this.isDragging = false;
      this.translate.lastX = this.translate.x;
      this.translate.lastY = this.translate.y;
    },
    mouseMoveEvent(e) {
      if(this.isDragging) {
        const x = e.screenX - this.translate.startX;
        const y = e.screenY - this.translate.startY;

        if(x > 0 && this.translate.x < 2000) {
          this.translate.x = x + this.translate.lastX;
        }
        else if(x < 0 && this.translate.x > -2000) {
          this.translate.x = x + this.translate.lastX;
        }

        if(y > 0 && this.translate.y < 2000) {
          this.translate.y = y + this.translate.lastY;
        }
        else if(y < 0 && this.translate.y > -2000) {
          this.translate.y = y + this.translate.lastY;
        }
      }
    }
  }
};
</script>
<style scoped>
#imageContainer {
  background: transparent;
}
.temp {
  @apply transition-lightbox;
}
</style>
