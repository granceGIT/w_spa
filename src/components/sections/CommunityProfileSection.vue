<template>
  <section class="page-section community-section d-flex flex-column gap-3" v-if="Object.keys(props.community).length">
    <div class="community-header d-flex flex-column text-center align-items-center gap-1">
      <div class="community-image mb-4">
        <img v-if="community.image" :src="community.image" alt="Изображение сообщества" class="img-cover">
        <UserAvatarIcon v-else/>
      </div>
      <div class="community-header-info d-flex flex-column">
        <div class="community-header-title">{{ community.name }}</div>
        <div class="community-header-subtitle">{{ community.status }}</div>
      </div>
    </div>
    <div class="community-actions d-flex align-items-center justify-content-around gap-1">
      <RouterLink :to="`/communities/${community.id}/update`" class="btn btn-primary"
                  v-if="community.user_id===userStore.user.id">Редактировать
      </RouterLink>
      <button class="btn btn-primary" v-if="!community.subscribed" @click="subscribeRequest">Подписаться</button>
      <button class="btn btn-alt" v-else @click="unsubscribeRequest">Отписаться</button>
    </div>
    <CommunityInfo :community="community" :key="community"/>
    <CommunityContributors :contributors="community.contributors" :key="community.contributors"/>
  </section>
  <ContentNotFound title="По вашему запросу ничего не найдено" text="Тут ничего нет..." v-else/>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import CommunityInfo from "@/components/community/CommunityInfo.vue";
import UserAvatarIcon from "@/components/icons/UserAvatarIcon.vue";
import CommunityContributors from "@/components/community/CommunityContributors.vue";
import {ref} from "vue";
import ContentNotFound from "@/components/ContentNotFound.vue";
import {useRouter} from "vue-router";

const props = defineProps({
  community: {
    type: Object,
    required: true,
  },
});
const router = useRouter();
const userStore = useUserStore();
const community = ref(props.community);


const subscribeRequest = async () => {
  if (!userStore.isAuthenticated) return await router.push("/login");
  community.value = await userStore.subscribeToCommunity(community.value.id);
};

const unsubscribeRequest = async () => {
  community.value = await userStore.unsubscribeFromCommunity(community.value.id);
};
</script>

<style scoped>
.community-header .community-header-title {
  font-size: var(--fz-extra-large);
}

.community-header .community-header-subtitle {
  color: var(--clr-text-alt);
}

.community-actions .btn {
  width: 100%;
}

.community-image {
  width: 8rem;
  height: 8rem;
}
</style>