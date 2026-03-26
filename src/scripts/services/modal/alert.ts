import { BaseModal } from "./base";

export class AlertModal extends BaseModal {
  constructor({ title, body }: { title: string, body: string }) {
    super({ title, body });
  }

  show() {
    return new Promise(resolve => {
      this.createModal(`
        <div class="modal fade" id="${this.id}" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header"><h5 class="modal-title">${this.title}</h5></div>
              <div class="modal-body">
                <div>${this.body}</div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-action="ok">OK</button>
              </div>
            </div>
          </div>
        </div>
      `);

      const okBtn = this.modalElement.querySelector('[data-action="ok"]');
      this.modalElement.addEventListener("hidden.bs.modal", () => this.disposeModal(), { once: true });

      okBtn.addEventListener("click", () => { resolve(true); this.modal.hide(); }, { once: true });
      this.modal.show();
    });
  }
}