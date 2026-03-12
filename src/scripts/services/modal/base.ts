import * as bootstrap from "bootstrap";

export abstract class BaseModal {
  protected id: string;
  protected title: string;
  protected body: string;

  protected modal: bootstrap.Modal = null;
  protected modalElement: HTMLElement = null;

  constructor({ title, body }: { title: string, body: string }) {
    this.id = `bs-modal-${Date.now()}`;
    this.title = title;
    this.body = body;
  }

  protected createModal(html: string) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper.firstElementChild);
    const el = document.getElementById(this.id);
    const bsModal = new bootstrap.Modal(el, { backdrop: 'static', keyboard: true });

    this.modalElement = el;
    this.modal = bsModal;
  }

  protected disposeModal() {
    try { this.modal.dispose(); } catch { }
    this.modalElement.remove();
  }

  abstract show(): Promise<unknown>;
}