<template>
  <div :class="parentClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    // start, center, end
    justify: {
      type: String,
      default: 'center'
    },
  },
  computed: {
      parentClass() {
          return `positionComponent flex justify-evenly justify-${this.justify}`;
      }
  }
};
</script>
