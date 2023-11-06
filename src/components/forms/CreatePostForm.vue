<template>
  <form action="#" @submit.prevent="validate" enctype="multipart/form-data" class="create-post-form">
    <div class="create-post-header d-flex gap-3">
      <div class="create-post-profile-image">
        <div class="user-image">
          <img v-if="userStore.user.image" :src="userStore.user.image" alt="Изображение профиля" class="img-cover">
          <UserAvatarIcon v-else/>
        </div>
      </div>
      <textarea class="create-post-input"
                :class="{'is-invalid':v$.content.$error}"
                id="new-post-text"
                name="new-post-text"
                v-model="content"
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
import {computed, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useToasterStore} from "@/stores/toaster";

const userStore = useUserStore();
const postStore = usePostStore();
const toastStore = useToasterStore();
const content = ref("");
const $externalResults = ref({});

const rules = computed(() => ({
  content: {
    required,
  },
}));

const v$ = useVuelidate(rules, {content}, {$externalResults});

async function validate() {
  v$.value.$clearExternalResults();
  if (!await v$.value.$validate()) return;
  const res = await createPostRequest();
  if (res === true) {
    v$.value.$reset();
    resetForm();
    toastStore.success({text: "Запись добавлена"});
  }
  $externalResults.value = res.errors ?? [];
}

const createPostRequest = async () => {
  return await postStore.create({
    userId: userStore.user.id,
    content: content.value,
  });
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

.create-post-input.is-invalid {
  border: 1px solid var(--bs-danger);
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

.user-image {
  width: 7rem;
  height: 7rem;
}
</style>