import api from "@/http";

export default class CommunityService {
    static async fetchCommunity(id) {
        return api.get(`/communities/${id}`);
    }

    static async create(payload) {
        if (payload instanceof FormData) {
            return api.postForm("/communities", payload);
        }
        return api.post("/communities", payload);
    }

    static async update(id, payload) {
        if (payload instanceof FormData) {
            payload.append("_method", "PUT");
            return api.postForm(`/communities/${id}`, payload);
        }
        return api.put(`/communities/${id}`, payload);
    }
}