import {AxiosError} from "axios";
import {useToasterStore} from "@/stores/toaster";

export default class ErrorHandler {

    static handle(e, type = "error", display = true) {
        if (display) {
            const toastStore = useToasterStore();

            if (e instanceof AxiosError) {
                const err = e.response.data.error;
                toastStore.createToast({
                    title: "Произошла ошибка",
                    text: err.message,
                    type,
                });
            } else {
                toastStore.error({text: "Что-то пошло не так..."});
            }
        }
    }
}