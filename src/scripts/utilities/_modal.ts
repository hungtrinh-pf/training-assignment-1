import { ModalProvider } from "../services/modal"

export const showAlert = (message: string) => {
    const modal = new ModalProvider({
        title: "Alert",
        body: message,
        type: "alert"
    });
    modal.show();
};

export const showConfirm = async (message: string) => {
    const modal = new ModalProvider({
        title: "Confirmation",
        body: message,
        type: "confirm"
    });
    const result = await modal.show();
    return result;
};

export const showPrompt = async (message: string, defaultValue: string = "") => {
    const modal = new ModalProvider({
        title: message,
        body: message,
        type: "prompt",
        inputValue: defaultValue
    });
    const result = await modal.show();
    return result;
};