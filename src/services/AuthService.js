import api from "@/http";

export default class AuthService {
    static async login(login, password) {
        return api.post("/login", {login, password});
    }

    static async register(name, surname, login, password, passwordConfirmation) {
        return api.post("/register", {name, surname, login, password, passwordConfirmation});
    }

    static async logout() {
        return api.get("/logout");
    }

    static async checkAuth() {
        const token = localStorage.getItem("token");
        if (token) {
            return api.get("/profile");
        }
    }
}