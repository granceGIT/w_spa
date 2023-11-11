import api from "@/http";

export default class PostService {
    static postFetchTypesRouteMap = {
        "all": ({page = 1}) => `/posts?page=${page}`,
        "one": ({id}) => `/posts/${id}`,
        "user": ({id, page = 1}) => `/users/${id}/posts?page=${page}`,
        "users": ({page = 1}) => `/posts?page=${page}`,
        "community": ({id, page = 1}) => `/communities/${id}/posts?page=${page}`,
        "communities": ({page = 1}) => `/posts?page=${page}`,
        "reactions": ({page = 1}) => `/posts?page=${page}`,
    };

    static async create(payload) {
        if (payload instanceof FormData) {
            return api.postForm("/posts", payload);
        }
        return api.post("/posts", payload);
    }

    static async fetchPosts({type = "all", ...args}) {
        return api.get(this.postFetchTypesRouteMap[type](args));
    }

    static async deletePost(id) {
        return api.delete(`/posts/${id}`);
    }
}