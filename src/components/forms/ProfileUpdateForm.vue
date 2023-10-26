<template>
  <section class="page-section auth-section">
    <form action="#" @submit.prevent="updateProfileData" class="auth-form d-flex flex-column gap-3" novalidate>
      <div class="form-header">
        <div class="form-header-title text-center">Изменение данных профиля</div>
      </div>
      <div class="form-content">
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':!!errors.name}" placeholder="Имя" id="name"
                 name="name" v-model="name"
                 required>
          <label for="name">Имя</label>
          <p class="invalid-text" v-if="errors.name">{{ errors.name.join(";\n") }}</p>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':!!errors.surname}" placeholder="Фамилия"
                 id="surname"
                 name="surname" v-model="surname"
                 required>
          <label for="surname">Фамилия</label>
          <p class="invalid-text" v-if="errors.surname">{{ errors.surname.join(";\n") }}</p>
        </div>
        <div class="form-floating mb-2">
          <input type="date" class="form-control" :class="{'is-invalid':!!errors.birthdate}" placeholder="Дата рождения"
                 id="birthdate"
                 name="birthdate" v-model="birthdate"
                 required>
          <label for="birthdate">Дата рождения</label>
          <p class="invalid-text" v-if="errors.birthdate">{{ errors.birthdate.join(";\n") }}</p>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':!!errors.status}" placeholder="Статус"
                 id="status"
                 name="status" v-model="status"
          >
          <label for="status">Статус</label>
          <p class="invalid-text" v-if="errors.status">{{ errors.status.join(";\n") }}</p>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':!!errors.job}" placeholder="Профессия" id="job"
                 name="job" v-model="job"
          >
          <label for="job">Профессия</label>
          <p class="invalid-text" v-if="errors.job">{{ errors.job.join(";\n") }}</p>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':!!errors.education}" placeholder="Образование"
                 id="education"
                 name="education" v-model="education"
          >
          <label for="education">Образование</label>
          <p class="invalid-text" v-if="errors.education">{{ errors.education.join(";\n") }}</p>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':!!errors.country}" placeholder="Страна"
                 id="country"
                 name="country" v-model="country"
          >
          <label for="country">Страна</label>
          <p class="invalid-text" v-if="errors.country">{{ errors.country.join(";\n") }}</p>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':!!errors.city}" placeholder="Город" id="city"
                 name="city" v-model="city"
          >
          <label for="city">Город</label>
          <p class="invalid-text" v-if="errors.city">{{ errors.city.join(";\n") }}</p>
        </div>
        <div class="form-floating mb-2">
          <input type="password" class="form-control" :class="{'is-invalid':!!errors.new_password}"
                 placeholder="Новый пароль"
                 id="new_password" v-model="new_password"
                 name="new_password">
          <label for="new_password">Новый пароль</label>
          <p class="invalid-text" v-if="errors.new_password">{{ errors.new_password.join(";\n") }}</p>
        </div>
        <div class="form-floating mb-2">
          <input type="password" class="form-control" :class="{'is-invalid':!!errors.password}"
                 placeholder="Пароль для подтверждения"
                 id="password" v-model="password"
                 name="password" required>
          <label for="password">Пароль для подтверждения</label>
          <p class="invalid-text" v-if="errors.password">{{ errors.password.join(";\n") }}</p>
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
import {ref} from "vue";
import {useToasterStore} from "@/stores/toaster";

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
const errors = ref({});


/*
* TODO: Необходимо реализовать валидацию всех форм (Логин,Регистрация,Создание поста,Изменение данных)
* TODO: возможно с вынесением формы и полей в отдельные компоненты
* TODO: либо создание хуков useField и useForm и связывание с полями и формой
*/

const updateProfileData = async () => {
  const res = await userStore.updateData({
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
  });
  if (res === true) {
    resetForm();
    toastStore.success({text: "Ваши данные обновлены!"});
  } else {
    errors.value = res.errors;
  }
};

const resetForm = () => {
  new_password.value = "";
  password.value = "";
};
</script>

<style scoped>
.auth-form .form-header-title {
  font-size: 1.5rem;
}

.auth-form .form-control {
  background-color: var(--clr-background-alt);
}

.auth-form label::after {
  background-color: var(--clr-transparent) !important;
}

.auth-form p.invalid-text {
  color: var(--bs-danger-text-emphasis);
}

.profile-image {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  border: 1px solid var(--clr-background-alt);
}
</style>