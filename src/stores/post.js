import {defineStore} from "pinia";
import ErrorHandler from "@/handlers/ErrorHandler";
import PostService from "@/services/PostService";

export const usePostStore = defineStore("post", {
    state: () => ({
        posts: [],
    }),
    actions: {
        async create(payload) {
            try {
                const {userId, content, attachments, communityId} = payload;
                await PostService.create(userId, content, attachments, communityId);
                await this.updatePosts({userId});
            } catch (e) {
                ErrorHandler.handle(e);
            }
        },
        async updatePosts(payload) {
            try {
                const {userId, communityId} = payload;
                if (communityId) {
                    const resp = await PostService.fetchCommunityPosts(communityId);
                    this.posts = resp.data;
                } else if (userId) {
                    const resp = await PostService.fetchUserPosts(userId);
                    this.posts = resp.data;
                } else {
                    const resp = await PostService.fetchAllPosts();
                    this.posts = resp.data;
                }
            } catch (e) {
                ErrorHandler.handle(e);
            }
        },
        async deletePost(payload) {
            try {
                const {id} = payload;
                await PostService.deletePost(id);
                this.posts = this.posts.filter(post => post.id !== id);
                return true;
            } catch (e) {
                ErrorHandler.handle(e);
            }
        },

    },
});