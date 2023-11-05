<template>
  <section class="page-section auth-section">
    <form action="#" @submit.prevent="validate" class="auth-form d-flex flex-column gap-3" novalidate>
      <div class="form-header">
        <div class="form-header-title text-center">Регистрация</div>
        <div class="form-header-subtitle text-center">
          Зарегистрируйтесь чтобы получить доступ к профилю
        </div>
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
          <input type="text" class="form-control" :class="{'is-invalid':v$.login.$error}" placeholder="Логин"
                 id="login"
                 name="login"
                 v-model="login"
                 @blur="v$.login.$touch"
                 required>
          <label for="login">Логин</label>
          <div class="client-errors">
            <p class="invalid-text" v-if="v$.login.$error && v$.login.required.$invalid">Поле логин обязательно для
              заполнения</p>
          </div>
          <div class="server-errors" v-if="$externalResults.login ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.login" :key="error">{{ error }}</p>
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
            <p class="invalid-text mb-1 p-0" v-else-if="v$.password.$error && v$.password.minLength.$invalid">Минимальная длина пароля 5 символов</p>
          </div>
          <div class="server-errors" v-if="$externalResults.password ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.password" :key="error">{{ error }}</p>
          </div>
        </div>
        <div class="form-floating mb-2">
          <input type="password" class="form-control" :class="{'is-invalid':v$.passwordConfirmation.$error}"
                 placeholder="Пароль"
                 id="passwordConfirmation"
                 v-model="passwordConfirmation"
                 name="passwordConfirmation"
                 @blur="v$.passwordConfirmation.$touch"
                 required>
          <label for="passwordConfirmation">Повтор пароля</label>
          <div class="client-errors">
            <p class="invalid-text mb-1 p-0"
               v-if="v$.passwordConfirmation.$error && v$.passwordConfirmation.required.$invalid">Поле обязательно для
              заполнения</p>
            <p class="invalid-text mb-1 p-0"
               v-else-if="v$.passwordConfirmation.$error && v$.passwordConfirmation.sameAsPassword.$invalid">Пароли не
              совпадают</p>
          </div>
          <div class="server-errors" v-if="$externalResults.passwordConfirmation ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.passwordConfirmation" :key="error">
              {{ error }}</p>
          </div>
        </div>
        <div class="form-check mt-3">
          <input type="checkbox" class="form-check-input" :class="{'is-invalid':v$.agreement.$error}" id="agreement"
                 checked required
                 name="agreement"
                 v-model="agreement"
                 @blur="v$.agreement.$touch"
          >
          <label for="agreement" class="form-check-label">Я согласен с правилами
            ресурса</label>
          <p class="invalid-text" v-if="v$.agreement.$error">Поле обязательно</p>
        </div>
      </div>
      <div class="form-footer d-flex flex-column gap-2">
        <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
        <div
            class="form-footer-actions d-flex justify-content-between align-items-center gap-2 mt-2">
          <p>Есть аккаунт?
            <RouterLink to="/login" class="link link-primary">Войти</RouterLink>
          </p>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {minLength, required, sameAs} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useToasterStore} from "@/stores/toaster";
import {minLen} from "@/validators/password";

const userStore = useUserStore();
const toastStore = useToasterStore();
const router = useRouter();
const name = ref("");
const surname = ref("");
const login = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const agreement = ref(true);
const $externalResults = ref({});

const rules = computed(() => ({
  name: {
    required,
  },
  surname: {
    required,
  },
  login: {
    required,
  },
  password: {
    required,
    minLength: minLength(minLen)
  },
  passwordConfirmation: {
    required,
    sameAsPassword: sameAs(password),
  },
  agreement: {
    required,
    true: sameAs(true),
  },
}));

const v$ = useVuelidate(rules, {name, surname, login, password, passwordConfirmation, agreement}, {$externalResults});

async function validate() {
  v$.value.$clearExternalResults();
  if (!await v$.value.$validate()) return;
  const res = await registerRequest();
  if (res === true) {
    v$.value.$reset();
    resetForm();
    toastStore.success({text:"Вы успешно зарегистрировались"})
    await router.push("/login");
  }
  $externalResults.value = res.errors ?? [];
}

const registerRequest = async () => {
  return await userStore.registerRequest({
    name: name.value,
    surname: surname.value,
    login: login.value,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
  });
};

const resetForm = () => {
  name.value = "";
  surname.value = "";
  login.value = "";
  password.value = "";
};
</script>

<style scoped>
.auth-form .form-header-title {
  font-size: 1.5rem;
}

.auth-form .form-header-subtitle {
  color: var(--clr-text-alt);
}

.auth-form .form-control {
  background-color: var(--clr-background-alt);
}

.auth-form label::after {
  background-color: var(--clr-transparent) !important;
}

.auth-form input[type=checkbox] {
  accent-color: var(--clr-primary);
}

.auth-form p.invalid-text {
  color: var(--bs-danger-text-emphasis);
}

.auth-form .server-errors,
.auth-form .client-errors {
  margin: 0;
  padding: 0;
  font-size: var(--fz-smaller);
}
</style>