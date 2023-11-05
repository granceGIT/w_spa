const reactionTypes = ["post", "comment", "image"];

const validateReactionType = (type) => {
    return reactionTypes.includes(type);
};

export {
    reactionTypes,
    validateReactionType,
};