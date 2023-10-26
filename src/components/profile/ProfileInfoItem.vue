<template>
  <div class="profile-info-item d-flex align-items-start gap-3 mb-3">
    <div class="profile-info-item-icon">
      <component :is="props.icon"/>
    </div>
    <div class="profile-info-item-header">
      <div class="profile-info-item-title">{{ props.title }}</div>
      <div class="profile-info-item-subtitle">{{ props.subtitle || "Не указано" }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  icon: {},
  subtitle: {
    type: [String, null],
    required: true,
  },
});
</script>

<style scoped>
.profile-info-item-title {
  font-size: var(--fz-larger);
  font-weight: normal;
}

.profile-info-item-subtitle {
  color: var(--clr-text-alt);
}

.profile-info-item-icon {
  width: 2rem;
  height: 2rem;
}
</style>