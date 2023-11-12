<template>
  <section class="page-section auth-section" v-if="Object.keys(props.community).length">
    <form action="#" @submit.prevent="validate" class="manage-form d-flex flex-column gap-3" novalidate>
      <div class="form-header">
        <div class="form-header-title text-center">Изменение данных сообщества</div>
      </div>
      <div class="form-content">
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':v$.name.$error}" placeholder="Название"
                 id="name"
                 name="name"
                 v-model="name"
                 @blur="v$.name.$touch"
                 required>
          <label for="name">Название</label>
          <div class="client-errors">
            <p class="invalid-text" v-if="v$.name.$error && v$.name.required.$invalid">Поле название обязательно для
              заполнения</p>
          </div>
          <div class="server-errors" v-if="$externalResults.name ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.name" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':$externalResults.description}" placeholder="Описание"
                 id="description"
                 name="description"
                 v-model="description">
          <label for="description">Описание</label>
          <div class="server-errors" v-if="$externalResults.description ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.description" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':v$.alias.$error}" placeholder="Краткое название"
                 id="alias"
                 name="alias"
                 v-model="alias"
                 @blur="v$.alias.$touch"
          >
          <label for="alias">Краткое название</label>
          <div class="client-errors">
            <p class="invalid-text" v-if="v$.alias.$error && v$.alias.match.$invalid">
              Поле, длиной от 3 до 25 символов может состоять из латинских букв, цифр и знака подчеркивания и может начинаться с буквы
            </p>
          </div>
          <div class="server-errors" v-if="$externalResults.alias ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.alias" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="my-4 upload-image box-alt border-0">
          <p class="mb-3 upload-image-title">Загрузить изображение сообщества</p>
          <div class="d-flex align-items-center justify-content-around">
            <div class="current-image-block d-flex flex-column gap-2">
              <div v-if="community.image" class="community-image">
                <img :src="community.image" alt="Текущее изображение сообщества"
                     class="current-image img-cover">
              </div>
              <div v-else class="community-image">
                <UserAvatarIcon class="img-cover"/>
              </div>

              <p class="text-center">Текущее</p>
            </div>
            <div class="new-image-block d-flex flex-column gap-2">
              <div v-if="image" class="community-image">
                <button type="button" @click="resetNewImage" class="upload-image-reset-btn">&times;
                </button>
                <img :src="imagePreview" alt="Новое изображение профиля" class="new-image img-cover">
              </div>
              <div v-else class="community-image border-0">
                <AddRingIcon class="upload-image-btn" @click="imageDialog.open"/>
              </div>
              <p class="text-center">Новое</p>
            </div>
          </div>
          <div class="server-errors text-center" v-if="$externalResults.image ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.image" :key="error">{{ error }}</p>
          </div>
        </div>
      </div>
      <div class="form-footer d-flex flex-column gap-2 align-items-end">
        <button type="submit" class="btn btn-primary">Сохранить</button>
      </div>
    </form>
  </section>
  <ContentNotFound title="Что-то пошло не так..." text="Можете вернуться на главную" v-else />
</template>

<script setup>
import {computed, ref} from "vue";
import {helpers, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import useFormData from "@/use/useFormData";
import {useFileDialog} from "@vueuse/core";
import AddRingIcon from "@/components/icons/AddRingIcon.vue";
import {acceptImageTypes} from "@/validators/images";
import CommunityService from "@/services/CommunityService";
import ErrorHandler from "@/handlers/ErrorHandler";
import UserAvatarIcon from "@/components/icons/UserAvatarIcon.vue";
import {useToasterStore} from "@/stores/toaster";
import ContentNotFound from "@/components/ContentNotFound.vue";

const props = defineProps({
  community:{
    type:Object,
    default:()=>({}),
  }
})

const toastStore = useToasterStore()

const name = ref(props.community.name);
const description = ref(props.community.description);
const alias = ref(props.community.alias);
const image = ref(null);
const imagePreview = ref(null);


// Валидация
const $externalResults = ref({});
const rules = computed(() => ({
  name: {
    required,
  },
  alias:{
    match:helpers.regex(/^[a-zA-Z]{1}[a-zA-Z\\d_]{2,24}$/)
  }
}));
const v$ = useVuelidate(rules, {name,alias}, {$externalResults});

async function validate() {
  // Очистка ошибок сервера
  v$.value.$clearExternalResults();
  if (!await v$.value.$validate()) return;
  const res = await updateCommunityRequest();
  if (res===true) {
    v$.value.$reset();
    resetNewImage();
    toastStore.success({text:"Данные обновлены"})
  }
  $externalResults.value = res.errors ?? [];
}

// Работа с изображением
const imageDialog = useFileDialog({
  accept: acceptImageTypes.join(","),
  multiple: false,
});

// TODO: Вывод imagePreview для ImageViewer (?)
imageDialog.onChange((files) => {
  image.value = files[0];
  imagePreview.value = URL.createObjectURL(image.value);
});

const resetNewImage = () => {
  image.value = null;
  imagePreview.value = null;
  imageDialog.reset();
};

// Запрос на изменение данных
const updateCommunityRequest = async () => {
  try{
    const fd = useFormData({
      name: name.value,
      description:description.value,
      alias:alias.value,
      image: image.value,
    });
    await CommunityService.update(props.community.id,fd);
    return true
  }
  catch(e){
    ErrorHandler.handle(e)
    return e.response.data.error;
  }
};
</script>

<style scoped>
.manage-form .form-header-title {
  font-size: 1.5rem;
}

.manage-form .form-control {
  background-color: var(--clr-background-alt);
}

.manage-form label::after {
  background-color: var(--clr-transparent) !important;
}

.manage-form p.invalid-text {
  color: var(--bs-danger);
}

.community-image {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  border: 1px solid var(--clr-text-alt);
  overflow: hidden;
}

.upload-image-title {
  color: var(--clr-text-alt);
}

.upload-image-btn {
  transition: all .25s;
  cursor: pointer;
  padding: 0;
  margin: 0;
}

.upload-image-btn:hover {
  transform: scale(1.05);
}

.new-image-block {
  position: relative;
}

.new-image, .current-image {
  transition: all .25s;
}

.new-image-block .upload-image-reset-btn {
  position: absolute;
  left: 100%;
  background-color: var(--bs-danger);
  border: 1px solid transparent;
  border-radius: 5px;
  width: 1.5rem;
  font-size: 1.5rem;
  height: 1.5rem;
  line-height: 1;
  color: var(--clr-light);
}

.new-image-block .upload-image-reset-btn:hover {
  border-color: var(--bs-danger);
  background-color: transparent;
  color: var(--bs-danger);
}

.new-image-block .upload-image-reset-btn:hover ~ img {
  opacity: .3;
}
</style>