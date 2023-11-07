import {defineStore} from "pinia";
import ErrorHandler from "@/handlers/ErrorHandler";
import PostService from "@/services/PostService";
import ReactionService from "@/services/ReactionService";

export const usePostStore = defineStore("post", {
    state: () => ({
        posts: [],
    }),
    actions: {
        async create(payload) {
            try {
                const resp = await PostService.create(payload);
                this.posts.unshift(resp.data);
                return true;
            } catch (e) {
                ErrorHandler.handle(e);
                return e.response.data.error;
            }
        },
        async updatePost(id) {
            try {
                const resp = await PostService.fetchPost(id);
                // изменить информацию о посте в store
                this.posts = this.posts.map(post => post.id === resp.data.id ? resp.data : post);
                return true;
            } catch (e) {
                ErrorHandler.handle(e);
                return e.response.data.error;
            }
        },
        async updatePosts(payload) {
            try {
                const {userId, communityId} = payload;
                let resp;
                if (communityId) resp = await PostService.fetchCommunityPosts(communityId);
                else if (userId) resp = await PostService.fetchUserPosts(userId);
                else resp = await PostService.fetchAllPosts();
                this.posts = resp.data;
            } catch (e) {
                ErrorHandler.handle(e);
                return e.response.data.error;
            }
        },
        async deletePost(id) {
            try {
                await PostService.deletePost(id);
                this.posts = this.posts.filter(post => post.id !== id);
                return true;
            } catch (e) {
                ErrorHandler.handle(e);
                return e.response.data.error;
            }
        },
        async setReaction(payload) {
            try {
                const {id, reactionId, type} = payload;
                return await ReactionService.setReaction(id, reactionId, type);
            } catch (e) {
                ErrorHandler.handle(e);
                return e.response.data.error;
            }
        },

    },
});