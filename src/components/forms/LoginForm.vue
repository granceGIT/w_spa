<template>
  <section class="page-section auth-section">
    <form action="#" @submit.prevent="loginRequest" class="auth-form d-flex flex-column gap-3" novalidate>
      <div class="form-header">
        <div class="form-header-title text-center">Авторизация</div>
        <div class="form-header-subtitle text-center">
          Войдите чтобы получить доступ к профилю
        </div>
      </div>
      <div class="form-content">
        <div class="form-floating mb-2">
          <input type="text" class="form-control" :class="{'is-invalid':!!errors.login}" placeholder="Логин" id="login"
                 name="login" v-model="login"
                 required>
          <label for="login">Логин</label>
          <p class="invalid-text" v-if="errors.login">{{ errors.login.join(";\n") }}</p>
        </div>
        <div class="form-floating mb-2">
          <input type="password" class="form-control" :class="{'is-invalid':!!errors.password}" placeholder="Пароль"
                 id="password" v-model="password"
                 name="password" required>
          <label for="password">Пароль</label>
          <p class="invalid-text" v-if="errors.password">{{ errors.password.join(";\n") }}</p>
        </div>
        <div class="form-check mt-3">
          <input type="checkbox" class="form-check-input" id="agreement" checked
                 name="agreement">
          <label for="agreement" class="form-check-label">Я согласен с правилами
            ресурса</label>
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
import {ref} from "vue";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const login = ref("");
const password = ref("");
const errors = ref({});

const loginRequest = async () => {
  const res = await userStore.loginRequest({login: login.value, password: password.value});
  if (res === true) {
    resetForm();
    await router.push("/");
  } else {
    errors.value = res.errors;
  }
};

const resetForm = () => {
  login.value = "";
  password.value = "";
  errors.value = {};
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
</style>