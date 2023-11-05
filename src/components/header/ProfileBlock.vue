<template>
  <div class="profile-manage ms-auto d-flex gap-1 align-items-center">
    <div class="notification-icon" v-if="userStore.isAuthenticated">
      <NotificationIcon/>
    </div>
    <div class="dropdown" v-if="userStore.isAuthenticated">
      <div class="user-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <UserAvatarIcon/>
      </div>
      <ul class="dropdown-menu border-0 box-shadow px-0 dropdown-menu-end">
        <li>
          <RouterLink :to="`/users/${userStore.user.id}`" class="dropdown-item">Профиль</RouterLink>
        </li>
        <li>
          <RouterLink to="/profile/update" class="dropdown-item">Изменить данные</RouterLink>
        </li>
        <li><span class="dropdown-item" @click="toggleTheme">Сменить тему</span></li>
        <li>
          <button class="dropdown-item" @click="logout">Выйти</button>
        </li>
      </ul>
    </div>

    <RouterLink to="/login" class="user-icon" v-else>
      <UserAvatarIcon/>
    </RouterLink>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import UserAvatarIcon from "@/components/icons/UserAvatarIcon.vue";
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const toggleTheme = () => {
  document.body.classList.toggle("dark-theme");
};

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

.user-icon {
  width: 3rem;
  height: 3rem;
  cursor: pointer;
}

.dropdown-menu {
  background-color: var(--clr-background);
  color: var(--clr-text);
}

.dropdown-item {
  color: var(--clr-text);
}

.dropdown-item:hover {
  background-color: var(--clr-background-alt);
}
</style>