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
                const {userId, content, attachments, communityId} = payload;
                await PostService.create(userId, content, attachments, communityId);
                await this.updatePosts({userId});
                return true;
            } catch (e) {
                ErrorHandler.handle(e);
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
        async deletePost(id) {
            try {
                await PostService.deletePost(id);
                this.posts = this.posts.filter(post => post.id !== id);
                return true;
            } catch (e) {
                ErrorHandler.handle(e);
            }
        },
        async setReaction(payload) {
            try {
                const {id, reactionId, type} = payload;
                return await ReactionService.setReaction(id, reactionId, type);
            } catch (e) {
                ErrorHandler.handle(e);
            }
        },

    },
});