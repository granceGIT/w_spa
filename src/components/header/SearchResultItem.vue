<template>
  <RouterLink :to="`/users/${props.user.id}`"
              class="search-result-item mb-2 d-flex align-items-center gap-2 text-decoration-none">
    <div class="image-block">
      <img v-if="props.user.image" :src="props.user.image" alt="profile image">
      <UserAvatarIcon v-else/>
    </div>
    <div class="info-block d-flex flex-column">
      <h3 class="info-block-title">{{ props.user.surname }} {{ props.user.name }}</h3>
      <h4 class="info-block-subtitle">{{ props.user.status }}</h4>
    </div>
  </RouterLink>
</template>

<script setup>
import UserAvatarIcon from "@/components/icons/UserAvatarIcon.vue";

const props = defineProps({
  user: {
    type: Object,
  },
});
</script>

<style scoped>
.search-result-item {
  padding: 9px;
  cursor: pointer;
  position: relative;
  border-radius: 5px;
}

.search-result-item:hover {
  background-color: var(--clr-background-alt);
}

.image-block {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}

.info-block-title {
  font-size: var(--fz-larger);
  font-weight: normal;
  color: var(--clr-text);
}

.info-block-subtitle {
  font-size: var(--fz-main);
  font-weight: normal;
  color: var(--clr-text-alt);
}
</style>