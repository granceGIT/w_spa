<template>
  <section class="page-section auth-section">
    <form action="#" @submit.prevent="registerRequest" class="auth-form d-flex flex-column gap-3" novalidate>
      <div class="form-header">
        <div class="form-header-title text-center">Регистрация</div>
        <div class="form-header-subtitle text-center">
          Зарегистрируйтесь чтобы получить доступ к профилю
        </div>
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
                 id="surname" v-model="surname"
                 name="surname" required>
          <label for="surname">Фамилия</label>
          <p class="invalid-text" v-if="errors.surname">{{ errors.surname.join(";\n") }}</p>
        </div>
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
                 name="agreement" required>
          <label for="agreement" class="form-check-label">Я согласен с правилами
            ресурса</label>
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
import {ref} from "vue";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const name = ref("");
const surname = ref("");
const login = ref("");
const password = ref("");
const errors = ref({});

const registerRequest = async () => {
  const res = await userStore.registerRequest({
    name: name.value,
    surname: surname.value,
    login: login.value,
    password: password.value,
  });
  if (res === true) {
    resetForm();
    await router.push("/login");
  } else {
    errors.value = res.errors;
  }
};

const resetForm = () => {
  name.value = "";
  surname.value = "";
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

.auth-form input[type=checkbox] {
  accent-color: var(--clr-primary);
}

.auth-form p.invalid-text {
  color: var(--bs-danger-text-emphasis);
}
</style>