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

    static async subscribeRequest(communityId) {
        return api.get(`/communities/${communityId}/subscribe`);
    }

    static async unsubscribeRequest(communityId) {
        return api.get(`/communities/${communityId}/unsubscribe`);
    }

    static async search(data) {
        return api.get(`/users?search=${data}`);
    }
}