import {defineStore} from "pinia";

const defaultType = "info";
const defaultTimeout = 5000;

export const useToasterStore = defineStore("toaster", {
    state: () => ({
        toasts: [],
    }),
    getters: {},
    actions: {
        createToast(payload) {
            const {title, text, type, timeout} = payload;
            const id = Math.random() * 1000;
            const timeoutId = setTimeout(() => {
                this.dismiss(id);
            }, timeout ?? defaultTimeout);

            const toast = {title, text, type: type ?? defaultType, id, timeoutId};
            this.toasts.push(toast);
        },
        success(payload) {
            this.createToast({...payload, type: "success"});
        },
        warning(payload) {
            this.createToast({...payload, type: "warning"});
        },
        error(payload) {
            this.createToast({...payload, type: "error"});
        },
        info(payload) {
            this.createToast({...payload, type: "info"});
        },
        dismiss(id) {
            this.toasts = this.toasts.filter(t => {
                if (t.id === id) {
                    clearTimeout(t.timeoutId);
                    return false;
                }
                return true;
            });
        },
    },
});