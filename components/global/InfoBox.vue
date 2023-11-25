<template>
  <div class="bg-ocean bg-opacity-50 p-4">
    <p><slot>default</slot></p>
  </div>
</template>
<style scoped>
div > p {
  margin: 0 !important;
}
</style>
