<template>
  <section class="page-section auth-section">
    <form action="#" @submit.prevent="validate" class="manage-form d-flex flex-column gap-3" novalidate>
      <div class="form-header">
        <div class="form-header-title text-center">Изменение данных профиля</div>
      </div>
      <div class="form-content">
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':v$.name.$error}" placeholder="Имя"
                 id="name"
                 name="name"
                 v-model="name"
                 @blur="v$.name.$touch"
                 required>
          <label for="name">Имя</label>
          <div class="client-errors">
            <p class="invalid-text" v-if="v$.name.$error && v$.name.required.$invalid">Поле имя обязательно для
              заполнения</p>
          </div>
          <div class="server-errors" v-if="$externalResults.name ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.name" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':v$.surname.$error}" placeholder="Фамилия"
                 id="surname"
                 name="surname"
                 v-model="surname"
                 @blur="v$.surname.$touch"
                 required>
          <label for="surname">Фамилия</label>
          <div class="client-errors">
            <p class="invalid-text" v-if="v$.surname.$error && v$.surname.required.$invalid">Поле фамилия обязательно
              для заполнения</p>
          </div>
          <div class="server-errors" v-if="$externalResults.surname ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.surname" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="date" class="form-control" :class="{'is-invalid':$externalResults.birthdate}"
                 placeholder="Дата рождения"
                 id="birthdate"
                 name="birthdate"
                 v-model="birthdate">
          <label for="birthdate">Дата рождения</label>
          <div class="server-errors" v-if="$externalResults.birthdate ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.birthdate" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':$externalResults.status}" placeholder="Статус"
                 id="status"
                 name="status"
                 v-model="status">
          <label for="status">Статус</label>
          <div class="server-errors" v-if="$externalResults.status ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.status" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':$externalResults.job}" placeholder="Профессия"
                 id="job"
                 name="job"
                 v-model="job">
          <label for="job">Профессия</label>
          <div class="server-errors" v-if="$externalResults.job ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.job" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':$externalResults.education}"
                 placeholder="Образование"
                 id="education"
                 name="education"
                 v-model="education">
          <label for="education">Образование</label>
          <div class="server-errors" v-if="$externalResults.education ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.education" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':$externalResults.country}" placeholder="Страна"
                 id="country"
                 name="country"
                 v-model="country">
          <label for="country">Страна</label>
          <div class="server-errors" v-if="$externalResults.country ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.country" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':$externalResults.city}" placeholder="Город"
                 id="city"
                 name="city"
                 v-model="city">
          <label for="city">Город</label>
          <div class="server-errors" v-if="$externalResults.city ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.city" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="password" class="form-control" :class="{'is-invalid':v$.new_password.$error}"
                 placeholder="Новый пароль"
                 id="new_password"
                 name="new_password"
                 v-model="new_password">
          <label for="new_password">Новый пароль</label>
          <div class="client-errors">
            <p class="invalid-text mb-1 p-0" v-if="v$.new_password.$error && v$.new_password.minLength.$invalid">
              Минимальная длина пароля 5 символов</p>
          </div>
          <div class="server-errors" v-if="$externalResults.new_password ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.new_password" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="password" class="form-control" :class="{'is-invalid':v$.password.$error}" placeholder="Пароль"
                 id="password"
                 v-model="password"
                 name="password"
                 @blur="v$.password.$touch"
                 required>
          <label for="password">Пароль</label>
          <div class="client-errors">
            <p class="invalid-text mb-1 p-0" v-if="v$.password.$error && v$.password.required.$invalid">Поле пароль
              обязательно для заполнения</p>
          </div>
          <div class="server-errors" v-if="$externalResults.password ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.password" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="my-4 upload-image box-alt border-0">
          <p class="mb-3 upload-image-title">Загрузить изображение профиля</p>
          <div class="d-flex align-items-center justify-content-around">
            <div class="current-image-block d-flex flex-column gap-2">
              <div v-if="userStore.user.image" class="profile-image">
                <img :src="userStore.user.image" alt="Текущее изображение профиля"
                     class="current-image img-cover">
              </div>
              <div v-else class="profile-image">
                <UserAvatarIcon class="img-cover"/>
              </div>

              <p class="text-center">Текущее</p>
            </div>
            <div class="new-image-block d-flex flex-column gap-2">
              <div v-if="image" class="profile-image">
                <button type="button" @click="resetNewImage" class="upload-image-reset-btn">&times;
                </button>
                <img :src="imagePreview" alt="Новое изображение профиля" class="new-image img-cover">
              </div>
              <div v-else class="profile-image border-0">
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
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import {computed, ref} from "vue";
import {useToasterStore} from "@/stores/toaster";
import {minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {minLen} from "@/validators/password";
import useFormData from "@/use/useFormData";
import {useFileDialog} from "@vueuse/core";
import AddRingIcon from "@/components/icons/AddRingIcon.vue";
import UserAvatarIcon from "@/components/icons/UserAvatarIcon.vue";
import {acceptImageTypes} from "@/validators/images";

const userStore = useUserStore();
const toastStore = useToasterStore();

const name = ref(userStore.user.name);
const surname = ref(userStore.user.surname);
const birthdate = ref(userStore.user.birthdate);
const status = ref(userStore.user.status);
const job = ref(userStore.user.job);
const education = ref(userStore.user.education);
const country = ref(userStore.user.country);
const city = ref(userStore.user.city);
const new_password = ref("");
const password = ref("");
const image = ref(null);
const imagePreview = ref(null);

// Валидация
const $externalResults = ref({});
const rules = computed(() => ({
  name: {
    required,
  },
  surname: {
    required,
  },
  new_password: {
    minLength: minLength(minLen),
  },
  password: {
    required,
  },
}));
const v$ = useVuelidate(rules, {name, surname, password, new_password}, {$externalResults});

async function validate() {
  // Очистка ошибок сервера
  v$.value.$clearExternalResults();
  if (!await v$.value.$validate()) return;
  const res = await updateProfileData();
  if (res === true) {
    v$.value.$reset();
    resetForm();
    toastStore.success({text: "Ваши данные обновлены!"});
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

// Сброс
const resetForm = () => {
  imageDialog.reset();
  imagePreview.value = null;
  new_password.value = "";
  password.value = "";
};

const resetNewImage = () => {
  image.value = null;
  imagePreview.value = null;
  imageDialog.reset();
};

// Запрос на изменение данных
const updateProfileData = async () => {
  const fd = useFormData({
    name: name.value,
    surname: surname.value,
    birthdate: birthdate.value,
    status: status.value,
    job: job.value,
    education: education.value,
    country: country.value,
    city: city.value,
    new_password: new_password.value,
    password: password.value,
    image: image.value,
  });
  return await userStore.updateData(fd);
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

.profile-image {
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