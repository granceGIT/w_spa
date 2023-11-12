<template>
  <RouterLink :to="`/users/${props.user.id}`" class="text-decoration-none community-contributors-item d-flex gap-2 align-items-center">
    <div class="community-contributor-image">
      <div class="user-image">
        <img v-if="props.user.image" :src="props.user.image" alt="Изображение профиля" class="img-cover">
        <UserAvatarIcon v-else/>
      </div>
    </div>
    <div class="community-contributor-info d-flex flex-column align-items-start">
      <h2 class="community-contributor-title">{{ props.user.name }} {{ props.user.surname }}</h2>
      <h3 class="community-contributor-subtitle">{{ props.user.role }}</h3>
    </div>
  </RouterLink>
</template>

<script setup>
import UserAvatarIcon from "@/components/icons/UserAvatarIcon.vue";

const props = defineProps({
  user:{
    type:Object,
    required:true,
  }
})
</script>

<style scoped>
.community-contributor-subtitle {
  color: var(--clr-text-alt);
  font-size: var(--fz-smaller);
  font-weight: normal;
}

.community-contributor-title {
  font-size: var(--fz-main);
  color: var(--clr-text);
}

.user-image{
  width: 3rem;
  height: 3rem;
}
</style>