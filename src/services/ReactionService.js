import api from "@/http";

export default class ReactionService {
    static ReactionsTypeRoutesMap = {
        "post": "posts",
        "comment": "comments",
        "image": "images",
    };

    static async setReaction(reactionable_id, reaction_id, type = "post") {
        return api.post(`/${this.ReactionsTypeRoutesMap[type]}/${reactionable_id}/react`, {reaction_id});
    }
}