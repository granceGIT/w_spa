<template>
  <div class="community-info-item row">
    <div class="col-6 title">{{ props.title }}</div>
    <div class="col-6 text">{{ props.subtitle }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  icon: {},
  subtitle: {
    type: [String,Number, null],
    required: true,
  },
});
</script>

<style scoped>
.community-info-item{
  padding: 9px;
  border-top: 1px solid var(--clr-background-alt);
}
</style>