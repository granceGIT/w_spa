import api from "@/http";

export default class PostService {
    static async create(userId, content, attachments = [], communityId = false) {
        const post = {user_id: userId, content};
        if (attachments.length) post.attachments = attachments;
        if (communityId) post.community_id = communityId;
        return api.post("/posts", post);
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