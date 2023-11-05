<template>
  <section class="page-section auth-section">
    <form action="#" @submit.prevent="validate" class="auth-form d-flex flex-column gap-3" novalidate>
      <div class="form-header">
        <div class="form-header-title text-center">Авторизация</div>
        <div class="form-header-subtitle text-center">
          Войдите чтобы получить доступ к профилю
        </div>
      </div>
      <div class="form-content">
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
          </div>
          <div class="server-errors" v-if="$externalResults.password ?? []">
            <p class="invalid-text mb-1 p-0" v-for="error in $externalResults.password" :key="error">{{ error }}</p>
          </div>
        </div>

      </div>
      <div class="form-footer d-flex flex-column gap-2">
        <button type="submit" class="btn btn-primary">Войти</button>
        <div
            class="form-footer-actions d-flex justify-content-between align-items-center gap-2 mt-2">
          <p>Еще нет аккаунта?
            <RouterLink to="/register"
                        class="link link-primary">Зарегистрироваться
            </RouterLink>
          </p>
          <p class="text-end">
            <RouterLink to="/" class="link link-primary">Забыли
              пароль?
            </RouterLink>
          </p>

        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import {computed, ref} from "vue";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const userStore = useUserStore();
const router = useRouter();

const login = ref("");
const password = ref("");
const $externalResults = ref({});

const rules = computed(() => ({
  login: {
    required,
  },
  password: {
    required,
  },
}));

const v$ = useVuelidate(rules, {login, password}, {$externalResults});

async function validate() {
  v$.value.$clearExternalResults();
  if (!await v$.value.$validate()) return;
  const res = await loginRequest();
  if (res === true) {
    v$.value.$reset();
    resetForm();
    await router.push('/');
  }
  $externalResults.value = res.errors ?? [];
}

const loginRequest = async () => {
  return await userStore.loginRequest({login: login.value, password: password.value});
};

const resetForm = () => {
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