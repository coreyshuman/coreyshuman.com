<template>
  <div class="container mb-6" :style="parentStyle">
    <iframe
      :src="src"
      :title="title"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</template>
<script>
export default {
  props: {
    src: {
        type: String,
        required: true
      },
    title: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '560px'
    }
  },
  computed: {
    parentStyle() {
        return `max-width:${this.width};`;
    }
  }
};
</script>
<style scoped>
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.container::after {
  display: block;
  content: "";
  padding-top: 56.25%;
}

.container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>