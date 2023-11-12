<template>
  <div class="post d-flex flex-column gap-4">
    <div v-if="props.post.community?.id" class="post-header text-decoration-none d-flex align-items-center gap-3 w-100">
      <div class="post-header-image">
        <div class="community-image">
          <img v-if="props.post.community.image" :src="props.post.community.image" alt="Изображение сообщества" class="img-cover">
          <UserAvatarIcon v-else/>
        </div>
      </div>
      <div  class="post-header-info d-flex flex-column">
        <RouterLink :to="`/communities/${props.post.community.id}`" class="post-header-title">{{ props.post.community.name }}</RouterLink>
        <div class="post-header-subtitle">{{ dateDiff }}</div>
        <RouterLink :to="`/users/${props.post.user.id}`" class="post-header-subtitle">от {{ props.post.user.surname }} {{ props.post.user.name }}</RouterLink>
      </div>

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

    <div v-else class="post-header text-decoration-none d-flex align-items-center gap-3 w-100">
      <div class="post-header-image">
        <div class="user-image">
          <img v-if="props.post.user.image" :src="props.post.user.image" alt="Изображение профиля" class="img-cover">
          <UserAvatarIcon v-else/>
        </div>
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
    <div class="post-content" v-html="postContent()"></div>

    <div class="post-images d-flex gap-1 flex-wrap" v-if="props.post.images.length">
      <div class="post-image"
           v-for="(image,index) in props.post.images"
           :key="image.id">
        <img
            :src="image.image"
            :alt="image.alt ?? `post ${props.post.id} image ${index}`"
            @click="imageStore.show(props.post.images,index)"
            class="img-cover viewable">
      </div>
    </div>
    <div class="post-footer d-flex justify-content-between">
      <Reactions :reactions="props.post.reactions"
                 :id="props.post.id"
                 type="post"
      />
    </div>
  </div>
</template>

<script setup>
import Reactions from "@/components/Reactions.vue";
import {formatDistance} from "date-fns";
import ru from "date-fns/locale/ru";
import UserAvatarIcon from "@/components/icons/UserAvatarIcon.vue";
import {useUserStore} from "@/stores/user";
import {useImageStore} from "@/stores/image";

const userStore = useUserStore();
const imageStore = useImageStore();

const emit = defineEmits(["update", "delete"]);
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

const deletePost = () => {
  emit("delete", props.post.id);
};

const postContent = ()=>{
  return props.post.content.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,'<br>')
}
</script>

<style scoped>
.post {
  padding: 1rem;
}

.post-header-title {
  text-decoration:none;
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

.post-image {
  aspect-ratio: auto;
  height: 4.5rem;
}

.post-image:nth-child(1) {
  width: 100%;
  height: auto;
}

.community-image{
  width: 4rem;
  height: 4rem;
}

.user-image{
  width: 3rem;
  height: 3rem;
}
</style>