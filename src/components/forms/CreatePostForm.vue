<template>
  <form action="#" @submit.prevent="createPostRequest" enctype="multipart/form-data" class="create-post-form">
    <div class="create-post-header d-flex gap-3">
      <div class="create-post-profile-image">
        <UserAvatarIcon/>
      </div>
      <textarea class="create-post-input" id="new-post-text" name="new-post-text" v-model="content"
                placeholder="Расскажите как ваши дела?"></textarea>
    </div>
    <div class="create-post-footer d-flex justify-content-between">
      <div class="create-post-attachments d-flex gap-3">
        <div class="create-post-attachment">
          img Изображение
        </div>
        <div class="create-post-attachment">
          file Файл
        </div>
      </div>
      <button class="create-post-button btn btn-primary">
        Отправить
      </button>
    </div>
  </form>
</template>

<script setup>
import UserAvatarIcon from "@/components/icons/UserAvatarIcon.vue";
import {useUserStore} from "@/stores/user";
import {usePostStore} from "@/stores/post";
import {ref} from "vue";

const userStore = useUserStore();
const postStore = usePostStore();
const content = ref("");

const createPostRequest = async () => {
  await postStore.create({
    userId: userStore.user.id,
    content: content.value,
  });
  resetForm();
};

const resetForm = () => {
  content.value = "";
};
</script>

<style scoped>
.create-post-header {
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--clr-background-alt);
}

.create-post-input {
  width: 100%;
  outline: 0;
  border: 0;
  padding: 9px;
  background-color: var(--clr-background-alt);
  border-radius: 5px 5px 5px 0px;
  max-height: 20ch;
  min-height: 10ch;
}

.create-post-attachment {
  border-radius: 5px;
  border: 1px solid var(--clr-background-alt);
  padding: 9px;
  cursor: pointer;
  transition: all .25s;
  color: var(--clr-text-alt);
}

.create-post-attachment:hover {
  background-color: var(--clr-background-alt);
}

.create-post-profile-image {
  width: 7rem;
  height: 7rem;
}
</style>