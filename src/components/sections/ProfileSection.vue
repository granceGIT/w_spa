<template>
  <section class="page-section profile-section">
    <div class="profile-header d-flex align-items-center gap-3">
      <Suspense>
        <template #fallback>
          <LoadingSpinner/>
        </template>
        <template #default>
          <ProfileSectionHeader :user="user"/>
        </template>
      </Suspense>
    </div>
    <div v-if="!userStore.isAuthenticated"
         class="profile-actions d-flex align-items-center justify-content-around gap-1">
      <RouterLink to="/login" class="btn btn-primary">Добавить в друзья</RouterLink>
    </div>
    <div v-if="userStore.isAuthenticated && id && id!==userStore.user.id"
         class="profile-actions d-flex align-items-center justify-content-around gap-1">
      <button class="btn btn-primary" @click="sendFriendRequest">Добавить в друзья</button>
    </div>
    <div class="profile-info">
      <div class="profile-info-header mb-4">
        <div class="profile-info-header-text">Информация</div>
      </div>
      <div class="profile-info-tab-content">
        <ProfileInfo :user="user"/>
      </div>
    </div>
  </section>
</template>

<script setup>
import ProfileSectionHeader from "@/components/profile/ProfileSectionHeader.vue";
import {useUserStore} from "@/stores/user";
import {useRoute} from "vue-router";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {ref, watch} from "vue";
import ProfileInfo from "@/components/profile/ProfileInfo.vue";
import {useToasterStore} from "@/stores/toaster";

const userStore = useUserStore();
const toastStore = useToasterStore();
const route = useRoute();
const id = ref(Number(route.params.id));
const user = ref({});

watch(
    () => route.params.id,
    async () => {
      id.value = Number(route.params.id);
      await fetchUser();
    },
);

const fetchUser = async () => {
  user.value = await userStore.fetchProfile({
    userId: Number(route.params.id),
  });
};

const sendFriendRequest = async () => {
  const res = await userStore.sendFriendRequest({userId: id.value});
  if (res) toastStore.success({text: "Запрос отправлен!"});
};

await fetchUser();

</script>

<style scoped>
.profile-section > * {
  margin-bottom: 1.5rem;
}

.profile-header {
  color: var(--clr-text);
}

.profile-info-header {
  padding: 9px;
  font-size: var(--fz-larger);
  border-bottom: 1px solid var(--clr-text-alt);
}

.profile-info-tabs .tab.active {
  background-color: var(--clr-background);
  color: var(--clr-primary);
}

.profile-actions .btn {
  width: 100%;
}
</style>