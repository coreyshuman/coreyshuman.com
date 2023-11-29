<template>
  <div id="gallery" class="flex flex-wrap gap-1.5" @click.capture.stop="onClick">
    <ProgressiveImage
      v-for="(image, index) of images"
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
      this.imageAssets = this.images.map(image => {
        let tempSrc = image.src;

        // remove leading / from image asset name
        if(tempSrc && tempSrc[0] === '/') {
          tempSrc = tempSrc.substring(1);
        }
        return {
          image: assets.images.find(asset => asset.src === tempSrc),
          alt: image.alt
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
