<template>
  <div class="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center">
    <h3 class="not-found-title" v-if="props.title">{{ props.title }}</h3>
    <p class="not-found-text" v-if="props.text">{{ props.text }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
});
</script>

<style scoped>
.not-found-title {
  font-size: var(--fz-larger);
  margin-bottom: 1rem;
  color: var(--clr-text);
}

.not-found-text {
  font-size: var(--fz-main);
  font-weight: normal;
  color: var(--clr-text-alt);
  margin: 0;
}
</style>