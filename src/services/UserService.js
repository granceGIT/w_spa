import api from "@/http";

export default class UserService {
    static async fetchProfile(userId) {
        return api.get(`/users/${userId}`);
    }

    static async updateData(data) {
        if (data instanceof FormData){
            data.append("_method", "PUT");
            return api.postForm(`/profile`, data);
        }
        return api.put(`/profile`, data);
    }

    static async friendRequest(userId) {
        return api.post("/profile/addFriend", {user_id: userId});
    }

    static async search(data) {
        return api.get(`/users?search=${data}`);
    }
}