import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import CommunityView from "@/views/CommunityView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import {useUserStore} from "@/stores/user";
import ProfileUpdateView from "@/views/ProfileUpdateView.vue";
import CommunityUpdateView from "@/views/CommunityUpdateView.vue";
import CommunityCreateView from "@/views/CommunityCreateView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: {
                title: "Проект W",
            },
        },
        {
            path: "/users/:id",
            name: "profile",
            component: ProfileView,
            meta: {
                title: "Профиль",
            },
        },
        {
            path: "/profile/update",
            name: "updateProfile",
            component: ProfileUpdateView,
            meta: {
                title: "Изменение данных профиля",
            },
        },
        {
            path: "/communities/create",
            name: "createCommunity",
            component: CommunityCreateView,
            meta: {
                title: "Новое сообщество",
            },
        },
        {
            path: "/communities/:id",
            name: "community",
            component: CommunityView,
            meta: {
                title: "Сообщество",
            },
        },
        {
            path: "/communities/:id/update",
            name: "updateCommunity",
            component: CommunityUpdateView,
            meta: {
                title: "Изменение данных сообщества",
            },
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
            meta: {
                title: "Авторизация",
            },
        },
        {
            path: "/register",
            name: "register",
            component: RegisterView,
            meta: {
                title: "Регистрация",
            },
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem("token");
    const userStore = useUserStore();

    if (token) {
        await userStore.checkAuth();
    }

    if (to.meta.authRequired && !userStore.isAuthenticated()) {
        next({name: "login"});
    } else next();
});

router.afterEach((to) => {
    document.title = to.meta.title || "Проект W";
});

export default router;
