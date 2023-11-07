import api from "@/http";

export default class PostService {
    static async create(payload) {
        if (payload instanceof FormData){
            return api.postForm("/posts", payload);
        }
        return api.post("/posts", payload);
    }

    static async fetchUserPosts(userId) {
        return api.get(`/users/${userId}/posts`);
    }

    static async fetchCommunityPosts(communityId) {
        return api.get(`/communities/${communityId}/posts`);
    }

    static async fetchAllPosts() {
        return api.get(`/posts`);
    }

    static async fetchPost(id) {
        return api.get(`/posts/${id}`);
    }

    static async deletePost(id) {
        return api.delete(`/posts/${id}`);
    }
}