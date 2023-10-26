<template>
  <div class="post d-flex flex-column gap-4">
    <RouterLink v-if="props.post.community?.id" :to="`/communities/${props.post.community?.id}`"
                class="post-header text-decoration-none d-flex align-items-center gap-3 w-100">
      <div class="post-header-image"></div>
      <div class="post-header-info d-flex flex-column">
        <div class="post-header-title">Name</div>
        <div class="post-header-subtitle">one hour ago</div>
      </div>
      <div class="post-header-actions ms-auto">...</div>
    </RouterLink>

    <div class="post-header text-decoration-none d-flex align-items-center gap-3 w-100">
      <div class="post-header-image">
        <UserAvatarIcon/>
      </div>
      <RouterLink :to="`/users/${props.post.user.id}`" class="post-header-info text-decoration-none d-flex flex-column">
        <div class="post-header-title">{{ props.post.user.surname }} {{ props.post.user.name }}</div>
        <div class="post-header-subtitle">{{ dateDiff }}</div>
      </RouterLink>
      <div class="post-header-actions ms-auto" v-if="props.post.user?.id===userStore.user.id">
        <div data-bs-toggle="dropdown" aria-expanded="false">
          ...
        </div>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <button class="dropdown-item" @click="deletePost">Удалить</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="post-content">
      {{ props.post.content }}
    </div>
    <div class="post-footer d-flex justify-content-between">
      <Reactions :setReactions="props.post.set_reactions" :reactions="props.post.reactions" :id="props.post.id"
                 type="post"/>
    </div>
  </div>
</template>

<script setup>
import Reactions from "@/components/Reactions.vue";
import {formatDistance} from "date-fns";
import ru from "date-fns/locale/ru";
import UserAvatarIcon from "@/components/icons/UserAvatarIcon.vue";
import {useUserStore} from "@/stores/user";
import {usePostStore} from "@/stores/post";
import {useToasterStore} from "@/stores/toaster";

const userStore = useUserStore();
const postStore = usePostStore();
const toastStore = useToasterStore();

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const dateDiff = formatDistance(new Date(props.post.created_at), new Date(), {
  addSuffix: true,
  locale: ru,
});

const deletePost = async () => {
  const res = await postStore.deletePost(props.post);
  if (res) {
    toastStore.success({text: "Запись удалена"});
  }
};
</script>

<style scoped>
.post {
  padding: 1rem;
}

.post-header-title {
  font-size: var(--fz-larger);
  color: var(--clr-text);
}

.post-header-subtitle {
  font-size: var(--fz-smaller);
  color: var(--clr-text-alt);
}

.post-header-actions {
  cursor: pointer;
}

.post-footer-comments {
  color: var(--clr-text-alt);
}

.post-header-image {
  width: 3rem;
  height: 3rem;
}
</style>