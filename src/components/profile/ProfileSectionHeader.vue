<template>
  <div class="profile-header-image">
    <div class="user-image">
      <img v-if="props.user.image" :src="props.user.image" alt="Изображение профиля" class="img-cover">
      <UserAvatarIcon v-else/>
    </div>
  </div>
  <div class="profile-header-info d-flex flex-column">
    <h2 class="profile-header-title">{{ props.user.name }} {{ props.user.surname }}</h2>
    <h3 class="profile-header-subtitle">{{ props.user.status }}</h3>
  </div>
</template>

<script setup>
import UserAvatarIcon from "@/components/icons/UserAvatarIcon.vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.profile-header-subtitle {
  color: var(--clr-text-alt);
  font-size: var(--fz-main);
  font-weight: normal;
}

.profile-header-title {
  font-size: var(--fz-extra-large);
}

.user-image{
  width: 5rem;
  height: 5rem;
}
</style>