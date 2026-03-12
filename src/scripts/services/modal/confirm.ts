import { BaseModal } from "./base";

export class ConfirmModal extends BaseModal {
  constructor({ title, body }: { title: string, body: string }) {
    super({ title, body });
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
      this.modalElement.addEventListener("hidden.bs.modal", () => this.disposeModal(), { once: true });

      okBtn.addEventListener("click", () => { resolve(true); this.modal.hide(); }, { once: true });
      cancelBtn.addEventListener("click", () => { resolve(false); this.modal.hide(); }, { once: true });
      this.modal.show();
    });
  }
}