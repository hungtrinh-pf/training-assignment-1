import { AlertModal } from "../services/modal/alert";
import { ConfirmModal } from "../services/modal/confirm";
import { PromptModal } from "../services/modal/prompt";

export const showAlert = (message: string) => {
    const modal = new AlertModal({ title: "Alert", body: message });
    modal.show();
};

export const showConfirm = async (message: string) => {
    const modal = new ConfirmModal({ title: "Confirmation", body: message });
    const result = await modal.show();
    return result;
};

export const showPrompt = async (message: string, defaultInput: string = "") => {
    const modal = new PromptModal({ title: "Prompt", body: message, defaultInput });
    const result = await modal.show();
    return result;
};