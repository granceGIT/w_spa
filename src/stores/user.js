import {defineStore} from "pinia";
import AuthService from "@/services/AuthService";
import ErrorHandler from "@/handlers/ErrorHandler";
import UserService from "@/services/UserService";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {},
    }),
    getters: {
        isAuthenticated() {
            return !!Object.keys(this.user).length;
        },
    },
    actions: {
        async loginRequest(payload) {
            try {
                const {login, password} = payload;
                const resp = await AuthService.login(login, password);
                localStorage.setItem("token", resp.data.token);
                this.user = resp.data.user;
                return true;
            } catch (e) {
                ErrorHandler.handle(e);
                return e.response.data.error;
            }
        },
        async registerRequest(payload) {
            try {
                const {name, surname, login, password, passwordConfirmation} = payload;
                const resp = await AuthService.register(name, surname, login, password, passwordConfirmation);
                localStorage.setItem("token", resp.data.token);
                this.user = resp.data.user;
                return true;
            } catch (e) {
                ErrorHandler.handle(e);
                return e.response.data.error;
            }
        },
        async logout() {
            try {
                await AuthService.logout();
                localStorage.removeItem("token");
                this.user = {};
                return true;
            } catch (e) {
                ErrorHandler.handle(e);
                return e.response.data.error;
            }
        },
        async checkAuth() {
            try {
                const resp = await AuthService.checkAuth();
                this.user = resp.data;
            } catch (e) {
                ErrorHandler.handle(e, "error", false);
            }
        },
        async fetchProfile(payload) {
            try {
                const {userId} = payload;
                const resp = await UserService.fetchProfile(userId || this.user.id);
                return resp.data;
            } catch (e) {
                ErrorHandler.handle(e);
            }
        },
        async updateData(payload) {
            try {
                const res = await UserService.updateData(payload);
                this.user = res.data;
                return true;
            } catch (e) {
                ErrorHandler.handle(e);
                return e.response.data.error;
            }
        },
        async sendFriendRequest(payload) {
            try {
                const {userId} = payload;
                await UserService.friendRequest(userId);
                return true;
            } catch (e) {
                ErrorHandler.handle(e);
            }
        },
        async subscribeToCommunity(communityId) {
            try {
                const res = await UserService.subscribeRequest(communityId);
                return res.data;
            } catch (e) {
                ErrorHandler.handle(e);
            }
        },
        async unsubscribeFromCommunity(communityId) {
            try {
                const res = await UserService.unsubscribeRequest(communityId);
                return res.data;
            } catch (e) {
                ErrorHandler.handle(e);
            }
        },
    },
});