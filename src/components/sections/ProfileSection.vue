<template>
  <section class="page-section profile-section p-0">
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
    <div>
      <Tabs :tabs="tabs">
        <template #content="{activeTab}">
          <Suspense>
            <template #default>
              <component :is="activeTab.component" v-bind="activeTab.props"/>
            </template>
            <template #fallback>
              <LoadingSpinner/>
            </template>
          </Suspense>
        </template>
      </Tabs>
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
import Tabs from "@/components/Tabs.vue";
import JobIcon from "@/components/icons/JobIcon.vue";
import DateIcon from "@/components/icons/DateIcon.vue";

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
  user.value = await userStore.fetchProfile({userId: id.value});
};

const sendFriendRequest = async () => {
  const res = await userStore.sendFriendRequest({userId: id.value});
  if (res) toastStore.success({text: "Запрос отправлен!"});
};
// TODO: нужен ли вызов функции здесь?
await fetchUser();


const tabs = [
  {
    title: "Информация",
    component: ProfileInfo,
    props: {user: user.value},
  },
  {
    title: "Друзья",
    component: JobIcon,
  },
  {
    title: "Сообщества",
    component: DateIcon,
  },
];

</script>

<style scoped>
.profile-section > * {
  margin-bottom: 1.5rem;
}

.profile-header {
  color: var(--clr-text);
}

.profile-header,.profile-actions{
  padding: 9px;
}

.profile-actions .btn {
  width: 100%;
}
</style>