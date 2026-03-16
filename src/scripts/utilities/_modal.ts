import { AlertModal } from "../services/modal/alert";
import { ConfirmModal } from "../services/modal/confirm";
import { PromptModal } from "../services/modal/prompt";

export const showAlert = (message: string, title: string = "Alert") => {
  const modal = new AlertModal({ title, body: message });
  modal.show();
};

export const showConfirm = async (message: string, title: string = "Confirmation") => {
  const modal = new ConfirmModal({ title, body: message });
  const result = await modal.show();
  return result;
};

export const showPrompt = async (message: string, defaultInput: string = "", title = "Prompt") => {
  const modal = new PromptModal({ title, body: message, defaultInput });
  const result = await modal.show();
  return result;
};