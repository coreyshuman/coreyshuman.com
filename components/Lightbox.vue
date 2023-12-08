<template>
  <section
    v-if="showLightbox"
    class="fixed top-0 left-0 w-full h-full text-steel"
    :style="backgroundStyle"
    role="region"
    aria-modal="true"
    aria-roledescription="carousel"
    :aria-label="imageCount > 1 ? 'one slide' : imageCount + ' slides'"
    @wheel.prevent="onWheel"
    @scroll.prevent
    @mousedown.prevent="onPointerDown"
    @mousemove.prevent="onPointerMove"
    @mouseup="onPointerUp"
    @touchstart="onPointerDown"
    @touchmove.prevent="onPointerMove"
    @touchend="onPointerUp"
    @touchcancel="onPointerCancel"
  >
    <div
      v-if="isGallery"
      class="absolute z-40 text-silver top-10 left-12 font-bold filter drop-shadow-dark"
      aria-hidden="true"
    >
      {{ imageIndex + 1 }} / {{ imageCount }}
    </div>

    <div class="controls">
      <button
        id="button-close"
        ref="close"
        class="absolute z-50 text-3xl text-silver top-10 right-4 md:right-12 opacity-70 hover:opacity-100 hover:text-red focus:text-red transition duration-300"
        :tabindex="1"
        aria-label="exit carousel"
        @click="close"
      >
        <fa class="filter drop-shadow-dark" :icon="['fa', 'times-circle']" />
      </button>

      <button
        v-if="isGallery"
        v-show="!hideUI"
        id="button-prev"
        ref="prev"
        class="absolute flex flex-wrap justify-center content-center z-40 text-5xl text-silver w-20 md:w-36 top-0 bottom-0 left-0 opacity-70 hover:opacity-100 hover:text-green focus:text-green transition duration-300"
        :tabindex="2"
        aria-controls="carousel-items"
        aria-label="previous slide"
        @pointerup="onPrev"
      >
        <fa class="filter drop-shadow-dark" :icon="['fa', 'arrow-alt-circle-left']" />
      </button>

      <button
        v-if="isGallery"
        v-show="!hideUI"
        id="button-next"
        ref="next"
        class="absolute flex flex-wrap justify-center content-center z-40 text-5xl text-silver w-20 md:w-36 top-0 bottom-0 right-0 opacity-70 hover:opacity-100 hover:text-green focus:text-green transition duration-300"
        :tabindex="0"
        aria-controls="carousel-items"
        aria-label="next slide"
        @pointerup="onNext"
      >
        <fa class="filter drop-shadow-dark" :icon="['fa', 'arrow-alt-circle-right']" />
      </button>
    </div>

    <div id="carousel-items" class="w-full h-full" aria-live="polite">
      <div
        id="imageContainer"
        class="flex flex-wrap justify-center content-center"
        :class="containerClass"
        :style="containerStyle"
        role="group"
        aria-roledescription="slide"
        :aria-label="(imageIndex + 1) + ' of ' + imageCount"
        @click.self="close"
      >
        <img
          v-show="isReady"
          :src="imageSrc"
          :style="imageStyle"
          :alt="alt"
          @load="onLoad"
          @touchstart.prevent="onPointerDown"
        />
        <div class="loader"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { Keycode } from '~/util/constant.mjs';

export default {
  data() {
    return {
      containerEl: null,
      imageEl: null,
      backgroundStyle: {
        background: 'rgb(0,0,0,0.9)'
      },
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
        transform: 'scale(1)',
        opacity: 1,
        cursor: 'grab'
      },
      imageAssets: [],
      imageCount: 0,
      imageIndex: 0,
      showLightbox: false,
      isLoading: false,
      isOpening: false,
      isReady: false,
      imageSrc: '',
      alt: '',
      touches: [],
      zoom: 1000,
      translate: {
        startX: 0,
        startY: 0,
        startDist: 0,
        lastX: 0,
        lastY: 0,
        lastDist: 0,
        x: 0,
        y: 0
      },
      swipeXDebounce: 0,
      isDragging: false,
      isZoomed: false,
      isSwipeX: false,
      isSwipeY: false,
      isSwipeClose: false,
      isSwipeNext: false,
      isSwipePrev: false
    }
  },
  computed: {
    hideUI() {
      return this.isZoomed || this.isSwipeX || this.isSwipeY;
    },
    isGallery() {
      return this.imageCount > 1;
    },
    containerClass() {
      return {
        loading: this.isLoading,
        'transition-lightbox duration-500': this.isOpening
      }
    }
  },
  watch: {
    zoom(zoomVal) {
      this.imageStyle.transform = `scale(${zoomVal / 1000}) translate(${this.translate.x / (zoomVal / 1000)}px, ${this.translate.y / (zoomVal / 1000)}px)`;
      console.log(this.imageStyle.transform)
    },
    translate: {
      handler(translateVal) {
        this.imageStyle.transform = `scale(${this.zoom / 1000}) translate(${translateVal.x / (this.zoom / 1000)}px, ${translateVal.y / (this.zoom / 1000)}px)`;
      },
      deep: true
    }
  },
  created() {
    this.$root.$on('lightboxLoad', ({images, index, location}) => {
      if(images && images[index]) {
        this.imageAssets = images;
        this.imageCount = images.length;
        this.imageIndex = index;
        this.show(location);
      }
    });
  },
  mounted() {
    document.addEventListener('keydown', this.onKeyDown, {capture: true});
    window.addEventListener('popstate', this.onNavigate);
    this.checkUrlAndOpenLightbox();
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown, {capture: true});
    window.removeEventListener('popstate', this.onNavigate);
  },
  methods: {
    show(location) {
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

      this.updateUrl();

      // set image
      this.updateImage();

      // allow div location to set on page, then we will animate it's movement
      // use setTimeout to wait for page to update since we want animation to *start* from the above location
      // nextTick() doesn't work here since it only waits for shadow dom update.
      // onUpdated() isn't available in Vue 2

      setTimeout(() => {
        this.$root.$emit('stopConstellation');

        // set image dimensions and opacity
        this.isOpening = true;
        this.containerStyle.left = '0';
        this.containerStyle.top = '0';
        this.containerStyle.right = '0';
        this.containerStyle.bottom = '0';
        this.containerStyle.width = '100%';
        this.containerStyle.height = '100%';
        this.containerStyle.opacity = 1;

        this.$el.focus();
        this.$emit('show', true);

        setTimeout(() => {
          // animation done
          this.isOpening = false;
          this.$root.$emit('startConstellation');
          this.containerEl = this.$el;
          this.imageEl = this.$el.querySelector('img');
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

      this.updateUrl(true);
      this.updateImage();
    },
    prev() {
      if(this.imageCount < 2) {
        return;
      }

      if(--this.imageIndex < 0) {
        this.imageIndex = this.imageCount - 1;
      }

      this.updateUrl(true);
      this.updateImage();
    },
    updateImage() {
      this.translate.lastX = this.translate.x = 0;
      this.translate.lastY = this.translate.y = 0;
      this.translate.startDist = 0;
      this.translate.lastDist = 1000;
      this.zoom = 1000;
      this.isDragging = this.isZoomed = false;
      this.isSwipeX = this.isSwipeY = false;
      this.isSwipeClose = this.isSwipeNext = this.isSwipePrev = false;

      const image = this.imageAssets[this.imageIndex];

      this.containerStyle.backgroundImage = `url(${image.image.generated.thumb.data})`;
      if(image.image.width > window.innerWidth || image.image.height > window.innerHeight) {
        this.containerStyle.backgroundSize = 'contain';
      } else {
        this.containerStyle.backgroundSize = `${image.image.width}px ${image.image.height}px`;
      }
      this.isLoading = true;
      this.imageSrc = image.image.src;
      this.imageStyle.opacity = 0;
      this.alt = image.alt;
      this.imageStyle.maxWidth = `${image.image.width}px`;
      this.imageStyle.maxHeight = `${image.image.height}px`;
      this.isReady = true;
    },
    updateTranslation() {
      const containerLocation = this.containerEl.getBoundingClientRect();
      const imageLocation = this.imageEl.getBoundingClientRect();

      let maxTranslationX = 0;
      let maxTranslationY = 0;

      if(this.isZoomed) {
        if(this.zoom > 1000) {
          maxTranslationX = (imageLocation.width - containerLocation.width) / 2;
          maxTranslationY = (imageLocation.height - containerLocation.height) / 2;
        }
      } else {
        maxTranslationX = containerLocation.width / 2;
        maxTranslationY = containerLocation.height / 2;
      }

      if(maxTranslationX < 0) {
        maxTranslationX = 0;
      }
      if(maxTranslationY < 0) {
        maxTranslationY = 0;
      }

      console.log('maxX', maxTranslationX);

      if(this.translate.x < -maxTranslationX) {
        this.translate.x = -maxTranslationX;
      } else if(this.translate.x > maxTranslationX) {
        this.translate.x = maxTranslationX;
      }

      if(this.translate.y < -maxTranslationY) {
        this.translate.y = -maxTranslationY;
      } else if(this.translate.y > maxTranslationY) {
        this.translate.y = maxTranslationY;
      }

      this.backgroundStyle.background = `rgb(0,0,0,0.9)`;
      if(this.isSwipeY) {
        const swipeAmount = Math.abs(this.translate.y / maxTranslationY);
        const alpha = 0.9 - swipeAmount * 0.8;
        this.backgroundStyle.background = `rgb(0,0,0,${alpha})`;
        this.isSwipeClose = swipeAmount > 0.25;
      } else if(this.isSwipeX) {
        const swipeAmount = this.translate.x / maxTranslationX;
        this.isSwipeNext = this.isSwipePrev = false;
        if(swipeAmount > 0.4) {
          this.isSwipePrev = true;
        } else if(swipeAmount < -0.4) {
          this.isSwipeNext = true;
        }
      }
    },
    close() {
      if(!this.showLightbox) {
        return;
      }

      this.showLightbox = false;
      this.isReady = false;
      // return focus to original image in content
      this.$emit('show', false);
      this.imageAssets[this.imageIndex].ref.focus();
      this.updateUrl(true);
    },
    updateUrl(replace) {
      const url = new URL(location);
      if(this.showLightbox) {
        url.searchParams.set('image', this.imageAssets[this.imageIndex].id);
      } else {
        url.searchParams.delete('image');
      }
      if(replace) {
        history.replaceState({}, '', url);
      } else {
        history.pushState({}, '', url);
      }
    },
    checkUrlAndOpenLightbox() {
      const url = new URL(location);
      const imageId = url.searchParams.get('image');
      if(!imageId) {
        return;
      }

      const imageEl = document.getElementById(imageId);
      if(!imageEl) {
        return;
      }

      imageEl.click();
    },
    onNavigate() {
      this.close();
    },
    onLoad() {
      if(this.isLoading) {
        this.isLoading = false;
        this.containerStyle.backgroundImage = '';
        this.imageStyle.opacity = 1;
      }
    },
    onKeyDown(ev) {
      if(this.showLightbox) {
        switch(ev.keyCode) {
          case Keycode.escape: this.close(); break;
          case Keycode.arrowLeft: this.prev(); break;
          case Keycode.arrowRight: this.next(); break;
        }

        this.onKeyDownButton(ev);
      }
    },
    onKeyDownButton(ev) {
      if(ev.keyCode === Keycode.enter || ev.keyCode === Keycode.space) {
        ev.preventDefault();
        ev.stopPropagation();

        const id = ev.target.id;
        switch(id) {
          case 'button-close':
            this.close();
            break;
          case 'button-next' :
            this.next();
            break;
          case 'button-prev':
            this.prev();
            break;
          default:
            // if not focusing a button, cycle through images and exit after last
            if(this.imageIndex < this.imageAssets.length - 1) {
              this.next();
            } else {
              this.close();
            }
        }
      } else if(ev.keyCode === Keycode.tab) {
        ev.preventDefault();
        if(this.imageCount < 2) {
          this.$refs.close.focus();
        } else {
          const id = ev.target.id;
          switch(id) {
            case 'button-next':
              this.$refs.prev.focus();
              break;
            case 'button-prev':
              this.$refs.close.focus();
              break;
            case 'button-close':
              this.$refs.next.focus();
              break;
            default:
              this.$refs.close.focus();
              break;
          }
        }
      }
    },
    onNext() {
      if(this.hideUI) {
        return;
      }

      this.next();
    },
    onPrev() {
      if(this.hideUI) {
        return;
      }

      this.prev();
    },
    onWheel(ev) {
      console.log('wheel', ev);
      const maxZoom = 5000;
      const minZoom = 1000;

      if(this.isSwipeX || this.isSwipeY) {
        return;
      }

      // large deltaX to work with mousewheel but avoid touchpad changes
      if(ev.deltaX < -99) {
        if(Date.now() - this.swipeXDebounce < 200) {
          return;
        }
        this.swipeXDebounce = Date.now();
        this.prev();
      } else if(ev.deltaX > 99) {
        if(Date.now() - this.swipeXDebounce < 200) {
          return;
        }
        this.swipeXDebounce = Date.now();
        this.next()
      } else if(ev.deltaY < 0 && this.zoom < maxZoom) {
        this.zoom -= ev.deltaY;
      } else if(ev.deltaY > 0 && this.zoom > minZoom) {
        this.zoom -= ev.deltaY;
        if(this.zoom < minZoom) {
          this.zoom = minZoom;
        }
      }

      this.updateTranslation();
      this.translate.lastX = this.translate.x;
      this.translate.lastY = this.translate.y;

      this.isZoomed = (this.zoom > 1000);

      this.imageStyle.cursor = this.isZoomed ? 'move' : 'grab';
    },
    onPointerDown(ev) {
      console.log('pointerDown', ev);
      let px, py;

      if(this.isDragging === true && ev.touches && ev.touches.length > 0) {
        this.translate.lastX = this.translate.x;
        this.translate.lastY = this.translate.y;
      }

      if(ev.targetTouches) {
        px = ev.targetTouches[0].screenX;
        py = ev.targetTouches[0].screenY;
      } else {
        px = ev.screenX;
        py = ev.screenY;
      }

      this.isDragging = true;
      this.translate.startX = px;
      this.translate.startY = py;
    },
    onPointerUp(ev) {
      console.log('pointerUp', ev);
      if(this.isDragging === true && ev.touches && ev.touches.length > 0) {
        if(ev.changedTouches[0].identifier === 0) {
          this.translate.startX = ev.touches[0].screenX;
          this.translate.startY = ev.touches[0].screenY;
          this.translate.lastX = this.translate.x;
          this.translate.lastY = this.translate.y;
        }
        return;
      }

      this.isDragging = false;
      this.isSwipeX = this.isSwipeY = false;
      this.translate.startX = 0;
      this.translate.startY = 0;
      this.translate.startDist = 0;
      this.translate.lastDist = this.zoom;

      if(this.isZoomed) {
        this.translate.lastX = this.translate.x;
        this.translate.lastY = this.translate.y;
        this.imageStyle.cursor = 'move';
      } else {
        this.translate.lastX = this.translate.lastY = 0;
        this.translate.x = this.translate.y = 0;
        this.imageStyle.cursor = 'grab';
      }

      this.updateTranslation();

      if(this.isSwipeClose) {
        this.close();
      } else if(this.isSwipeNext) {
        this.next();
      } else if(this.isSwipePrev) {
        this.prev();
      }

      this.isSwipeClose = this.isSwipeNext = this.isSwipePrev = false;
    },
    onPointerCancel(ev) {
      console.log('cancel', ev);
      this.isDragging = false;
      this.isSwipeX = this.isSwipeY = false;
      this.isSwipeClose = this.isSwipeNext = this.isSwipePrev = false;
      this.translate.startX = 0;
      this.translate.startY = 0;
      this.translate.lastX = this.translate.lastY = 0;
      this.translate.x = this.translate.y = 0;
      this.translate.startDist = 0;
      this.translate.lastDist = 1000;

      this.updateTranslation();
    },
    onPointerMove(ev) {
      console.log('pointerMove', ev);
      if(this.isDragging) {
        if(ev.targetTouches && ev.targetTouches.length > 1 && !this.isSwipeX && ! this.isSwipeY) {
          this.handleTwoPointMove(ev);
        } else {
          this.handleOnePointMove(ev);
        }

        this.updateTranslation();
      }
    },
    handleOnePointMove(ev) {
      console.log('onePointMove', ev);
      const maxTranslate = 2000;
      let px, py;

      if(ev.targetTouches) {
        px = ev.targetTouches[0].screenX;
        py = ev.targetTouches[0].screenY;
      } else {
        px = ev.screenX;
        py = ev.screenY;
      }

      const x = px - this.translate.startX;
      const y = py - this.translate.startY;

      if(this.isGallery && !this.isZoomed && !this.isSwipeY && Math.abs(x) > 8) {
        this.isSwipeX = true;
      } else if(!this.isZoomed && !this.isSwipeX && Math.abs(y) > 8) {
        this.isSwipeY = true;
      }

      if(this.isZoomed || this.isSwipeX) {
        if(x > 0 && this.translate.x < maxTranslate) {
          this.translate.x = x + this.translate.lastX;
        } else if(x < 0 && this.translate.x > -maxTranslate) {
          this.translate.x = x + this.translate.lastX;
        }
      }

      if(this.isZoomed || this.isSwipeY) {
        if(y > 0 && this.translate.y < maxTranslate) {
          this.translate.y = y + this.translate.lastY;
        } else if(y < 0 && this.translate.y > -maxTranslate) {
          this.translate.y = y + this.translate.lastY;
        }
      }

      if(this.isSwipeX || this.isSwipeY) {
        this.imageStyle.cursor = 'grabbing';
      }

      if(this.isZoomed) {
        this.imageStyle.cursor = 'move';
      }

      this.translate.lastDist = this.zoom;
      this.translate.startDist = 0;
    },
    handleTwoPointMove(ev) {
      console.log('twoPointMove', ev);
      const maxTranslate = 2000;
      const zoomMultiplier = 7;
      const p1x = ev.targetTouches[0].screenX;
      const p2x = ev.targetTouches[1].screenX;
      const p1y = ev.targetTouches[0].screenY;
      const p2y = ev.targetTouches[1].screenY;

      const dist = Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2));

      if(this.translate.startDist === 0) {
        this.translate.startDist = dist;
      } else {
        this.zoom = this.translate.lastDist + (dist - this.translate.startDist) * zoomMultiplier;
        if(this.zoom < 1000) {
          this.zoom = 1000;
        }
        if(this.zoom > 5000) {
          this.zoom = 5000;
        }
      }

      this.isZoomed = this.zoom > 1000;

      const x = p1x - this.translate.startX;
      const y = p1y - this.translate.startY;

      if(this.isZoomed) {
        if(x > 0 && this.translate.x < maxTranslate) {
          this.translate.x = x + this.translate.lastX;
        } else if(x < 0 && this.translate.x > -maxTranslate) {
          this.translate.x = x + this.translate.lastX;
        }
      }

      if(this.isZoomed) {
        if(y > 0 && this.translate.y < maxTranslate) {
          this.translate.y = y + this.translate.lastY;
        } else if(y < 0 && this.translate.y > -maxTranslate) {
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

div.loading {
  filter:blur(3px);
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

.temp {
  @apply transition-lightbox;
}
</style>
