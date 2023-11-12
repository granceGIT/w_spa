<template>
  <div class="profile-manage ms-auto d-flex gap-1 align-items-center">
    <div class="notification-icon" v-if="userStore.isAuthenticated">
      <div class="dropdown-center">
        <div data-bs-toggle="dropdown" type="button" aria-expanded="false">
          <NotificationIcon/>
        </div>
        <div class="dropdown-menu notifications-dropdown-content">
          <p class="mt-3 text-center">Тут должны быть уведомления :\</p>
        </div>
      </div>
    </div>
    <div class="dropdown" v-if="userStore.isAuthenticated">
      <div class="user-image" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img v-if="userStore.user.image" :src="userStore.user.image" alt="Изображение профиля" class="img-cover">
        <UserAvatarIcon v-else/>
      </div>
      <ul class="dropdown-menu border-0 box-shadow px-0 dropdown-menu-end">
        <li>
          <RouterLink :to="`/users/${userStore.user.id}`" class="dropdown-item">Профиль</RouterLink>
        </li>
        <li>
          <RouterLink to="/profile/update" class="dropdown-item">Изменить данные</RouterLink>
        </li>
        <li><span class="dropdown-item" @click="toggleDark()">Сменить тему</span></li>
        <li><span class="dropdown-item" @click="toggleStyle()">Сменить стиль</span></li>
        <li>
          <button class="dropdown-item" @click="logout">Выйти</button>
        </li>
      </ul>
    </div>

    <div class="dropdown" v-else>
      <div class="user-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <UserAvatarIcon/>
      </div>
      <ul class="dropdown-menu border-0 box-shadow px-0 dropdown-menu-end">
        <li>
          <RouterLink to="/login" class="dropdown-item">Авторизация</RouterLink>
        </li>
        <li>
          <RouterLink to="/register" class="dropdown-item">Регистрация</RouterLink>
        </li>
        <li><span class="dropdown-item" @click="toggleDark()">Сменить тему</span></li>
        <li><span class="dropdown-item" @click="toggleStyle()">Сменить стиль</span></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import UserAvatarIcon from "@/components/icons/UserAvatarIcon.vue";
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
import {useRouter} from "vue-router";
import {useDark, useToggle} from "@vueuse/core";

const isRetro = useDark({
  selector: "body",
  attribute: "color-style",
  valueDark: "retro",
  initialValue: "light",
  storageKey: "style",
});
const isDark = useDark({
  selector: "body",
  attribute: "color-scheme",
  valueDark: "dark",
  valueLight: "light",
  storageKey: "theme",
});
const toggleDark = useToggle(isDark);
const toggleStyle = useToggle(isRetro);

const userStore = useUserStore();
const router = useRouter();

const logout = async () => {
  const res = await userStore.logout();
  if (res) {
    await router.push("/");
  }
};
</script>

<style scoped>
.notification-icon {
  width: 2.5rem;
  height: 2.2rem;
  cursor: pointer;
}

.notifications-dropdown-content {
  padding: 9px;
  min-height: 10ch;
  width: 40ch;
  border: 1px solid var(--clr-primary);
}

.notifications-dropdown-content > p {
  color: var(--clr-text-alt);
}
</style>