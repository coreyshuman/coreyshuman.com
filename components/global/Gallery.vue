<template>
  <div id="gallery" class="flex flex-wrap gap-1.5" @click.capture.stop="onClick" @keydown.capture="onKeyDown">
    <ProgressiveImage
      v-for="(image, index) of images"
      ref="imageRefs"
      :key="index"
      :src="image.src"
      :alt="image.alt"
      class="flex-grow rounded-md"
      width="100%"
      height="300px"
      :mosaic="true"
      :data-id="index"
    />
  </div>
</template>

<script>
import assets from '../../assets/js/images';
import { Keycode } from '~/util/constant.mjs';

export default {
    props: {
        // start, center, end
        images: {
            type: Array,
            required: true
        },
    },
    data() {
      return {
        imageAssets: []
      }
    },
    mounted() {
      this.imageAssets = this.images.map((image, index) => {
        let tempSrc = image.src;

        // remove leading / from image asset name
        if(tempSrc && tempSrc[0] === '/') {
          tempSrc = tempSrc.substring(1);
        }
        return {
          ...image,
          image: assets.images.find(asset => asset.src === tempSrc),
          ref: this.$refs.imageRefs[index].$refs.img,
          id: this.$refs.imageRefs[index].$refs.img.id
        }
      });
    },
    methods: {
      onClick(ev) {
        const location = ev.target.getBoundingClientRect();
        this.$root.$emit('lightboxLoad', {
          images: this.imageAssets,
          index: Number.parseInt(ev.target.parentElement.dataset.id),
          location
      });
      },
      onKeyDown(ev) {
        if(ev.keyCode === Keycode.enter || ev.keyCode === Keycode.space) {
          ev.preventDefault();
          this.onClick(ev);
        }
      }
    }
};
</script>
<style scoped>
div#gallery > div {
  margin: 0;
}

div#gallery > div >>> img {
  @apply rounded-md;
}
</style>
