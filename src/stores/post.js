import {defineStore} from "pinia";
import ErrorHandler from "@/handlers/ErrorHandler";
import PostService from "@/services/PostService";
import ReactionService from "@/services/ReactionService";

export const usePostStore = defineStore("post", {
    state: () => ({
        posts: [],
        payload: {
            page: 1,
            type: "all",
        },
        postLoader: true,
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
        async _getPosts(payload) {
            try {
                const resp = await PostService.fetchPosts(payload);
                return resp.data.data;
            } catch (e) {
                ErrorHandler.handle(e);
                return e.response.data.error;
            }
        },
        async updatePosts(payload) {
            this.postLoader = true;
            this.payload = payload;
            this.posts = await this._getPosts(payload);
        },
        async loadMore() {
            this.payload.page++;
            const res = await this._getPosts(this.payload);
            if (res.length < 1) this.postLoader = false;
            this.posts.push(...res);
            return true;
        },
        async updatePost(id) {
            try {
                const resp = await PostService.fetchPosts({type: "one", id});
                // изменить информацию о посте в store
                this.posts = this.posts.map(post => post.id === resp.data.id ? resp.data : post);
                return true;
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