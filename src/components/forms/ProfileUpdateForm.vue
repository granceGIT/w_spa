<template>
  <section class="page-section auth-section">
    <form action="#" @submit.prevent="validate" class="auth-form d-flex flex-column gap-3" novalidate>
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
                 v-model="birthdate"
                 required>
          <label for="birthdate">Дата рождения</label>
          <div class="server-errors" v-if="$externalResults.birthdate ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.birthdate" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':$externalResults.status}" placeholder="Статус"
                 id="status"
                 name="status"
                 v-model="status"
                 required>
          <label for="status">Статус</label>
          <div class="server-errors" v-if="$externalResults.status ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.status" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':$externalResults.job}" placeholder="Профессия"
                 id="job"
                 name="job"
                 v-model="job"
                 required>
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
                 v-model="education"
                 required>
          <label for="education">Образование</label>
          <div class="server-errors" v-if="$externalResults.education ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.education" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':$externalResults.country}" placeholder="Страна"
                 id="country"
                 name="country"
                 v-model="country"
                 required>
          <label for="country">Страна</label>
          <div class="server-errors" v-if="$externalResults.country ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.country" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':$externalResults.city}" placeholder="Город"
                 id="city"
                 name="city"
                 v-model="city"
                 required>
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
                 v-model="new_password"
                 required>
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

/*
* TODO: Необходимо реализовать валидацию всех форм (Логин,Регистрация,Создание поста,Изменение данных)
* TODO: добавить валидацию изображения после создания инструмента загрузки изображений
*/

const updateProfileData = async () => {
  return await userStore.updateData({
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