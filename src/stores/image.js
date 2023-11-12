import {defineStore} from "pinia";

export const useImageStore = defineStore("image", {
    state: () => ({
        images: [],
        visible: false,
        activeIndex: 0,
    }),
    getters: {
        image() {
            return this.images[this.activeIndex];
        },
    },
    actions: {
        show(images, active = 0) {
            this.images = images;
            this.activeIndex = active;
            this.visible = true;
        },
        close() {
            this.visible = false;
            this.images = [];
        },
        next() {
            this.activeIndex = this.activeIndex === this.images.length - 1 ? 0 : this.activeIndex + 1;
        },
        prev() {
            this.activeIndex = this.activeIndex === 0 ? this.images.length - 1 : this.activeIndex - 1;
        },
    },
});