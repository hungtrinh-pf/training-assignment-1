import { BaseModal } from "./base";

export class PromptModal extends BaseModal {
  private defaultInput: string;

  constructor({ title, body, defaultInput }: { title: string, body: string, defaultInput: string }) {
    super({ title, body });
    this.defaultInput = defaultInput;
  }

  show() {
    return new Promise(resolve => {
      this.createModal(`
        <div class="modal fade" id="${this.id}" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header"><h5 class="modal-title">${this.title}</h5></div>
              <div class="modal-body">
                <div>${this.body}</div>
                <input class="form-control mt-2" value="${this.defaultInput}">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-action="ok">OK</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" data-action="cancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      `);

      const okBtn = this.modalElement.querySelector('[data-action="ok"]');
      const cancelBtn = this.modalElement.querySelector('[data-action="cancel"]');
      const inputEl = this.modalElement.querySelector('input') as HTMLInputElement;
      this.modalElement.addEventListener("hidden.bs.modal", () => this.disposeModal(), { once: true });

      okBtn.addEventListener("click", () => { resolve(inputEl ? inputEl.value : ""); this.modal.hide(); }, { once: true });
      cancelBtn.addEventListener("click", () => { resolve(false); this.modal.hide(); }, { once: true });
      this.modal.show();
    });
  }
}