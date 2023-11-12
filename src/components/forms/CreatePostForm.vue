<template>
  <form action="#" @submit.prevent="validate" enctype="multipart/form-data" class="create-post-form">
    <div class="create-post-header d-flex gap-3">
      <div class="create-post-profile-image" v-if="Object.keys(community).length">
        <div class="user-image">
          <img v-if="props.community.image" :src="props.community.image" alt="Изображение сообщества" class="img-cover">
          <UserAvatarIcon v-else/>
        </div>
      </div>
      <div class="create-post-profile-image" v-else>
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
                maxlength="1000"
                placeholder="Расскажите как ваши дела?"></textarea>
    </div>
    <div v-if="attachedImages.length" class="create-post-main d-flex flex-wrap gap-2">
      <div v-for="({name,image},index) in attachedImagesPreview" :key="name" class="image-preview">
        <button type="button" @click="resetNewImage(name)" class="upload-image-reset-btn">&times;
        </button>
        <img :src="image"
             :alt="`attached image ${name}`"
             @click="imageStore.show(attachedImagesPreview,index)"
             class="img-cover">
      </div>
      <div class="server-errors" v-if="$externalResults ?? []">
        <p class="invalid-text mb-1 p-0" v-for="error in $externalResults" :key="error">{{ String(error) }}</p>
      </div>
    </div>
    <div class="create-post-footer d-flex justify-content-between">
      <div class="create-post-attachments d-flex gap-3">
        <div class="create-post-attachment" @click="imageDialog.open">
          img Изображение
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
import {computed, ref, watch} from "vue";
import {requiredUnless} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useToasterStore} from "@/stores/toaster";
import {useFileDialog} from "@vueuse/core";
import useFormData from "@/use/useFormData";
import {useImageStore} from "@/stores/image";
import {acceptImageTypes} from "@/validators/images";

const props = defineProps({
  community: {
    type: Object,
    default: () => ({}),
  },
});

const userStore = useUserStore();
const postStore = usePostStore();
const toastStore = useToasterStore();
const imageStore = useImageStore();

// TODO: Обработка ввода ссылок в поле content (?)
const content = ref("");
const attachedImages = ref([]);
const attachedImagesPreview = ref(null);

// Валидация
const $externalResults = ref({});
const rules = computed(() => ({
  content: {
    requiredIfNoImages: requiredUnless(attachedImages.value.length),
  },
}));
const v$ = useVuelidate(rules, {content}, {$externalResults});

async function validate() {
  // Очистка ошибок сервера
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

// Работа с изображениями
const imageDialog = useFileDialog({
  accept: acceptImageTypes.join(","),
});

imageDialog.onChange((files) => {
  if (files.length > 10) {
    toastStore.warning({title: "Ошибка", text: "Нельзя прикрепить больше 10 изображений"});
    attachedImages.value = [...files].slice(0, 10);
  } else attachedImages.value = [...files];
});

watch(attachedImages, () => {
  // При изменении прикрепленных фото обновляем их предпросмотр
  attachedImagesPreview.value = attachedImages.value.map((file) => ({
    name: file.name,
    image: URL.createObjectURL(file),
  }));
});

// Сброс значений
const resetNewImage = (name) => {
  attachedImages.value = attachedImages.value.filter(item => item.name !== name);
};

const resetForm = () => {
  content.value = "";
  attachedImages.value = [];
  imageDialog.reset();
};

// Запрос на создание поста
const createPostRequest = async () => {
  const fd = useFormData({content: content.value, community_id: props.community.id});
  for (const image of attachedImages.value) {
    fd.append("images[]", image);
  }
  return postStore.create(fd);
};
</script>

<style scoped>
.create-post-header, .create-post-main {
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
  border-radius: 5px 5px 5px 0;
  max-height: 20ch;
  min-height: 10ch;
}

.create-post-input.is-invalid {
  border: 1px solid var(--bs-danger);
}

.server-errors .invalid-text {
  color: var(--bs-danger);
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

.image-preview {
  height: 5rem;
  aspect-ratio: auto;
  position: relative;
}

.upload-image-reset-btn {
  position: absolute;
  right: 0;
  background-color: var(--bs-danger);
  border: 1px solid transparent;
  border-radius: 5px;
  width: 1.5rem;
  font-size: 1.5rem;
  height: 1.5rem;
  line-height: 1;
  color: var(--clr-light);
  z-index: 1;
}

.upload-image-reset-btn:hover {
  border-color: var(--bs-danger);
  background-color: transparent;
  color: var(--bs-danger);
}

.upload-image-reset-btn:hover ~ img {
  opacity: .5;
}
</style>