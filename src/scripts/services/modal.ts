import * as bootstrap from "bootstrap";

export class ModalProvider {
    private id: string;
    private title: string;
    private body: string;
    private type: "alert" | "confirm" | "prompt";
    private inputValue: string;
    
    private modal: bootstrap.Modal = null;
    private modalElement: HTMLElement = null;

    constructor({
        title,
        body,
        type,
        inputValue,
    }: {
        title: string,
        body: string,
        type: "alert" | "confirm" | "prompt",
        inputValue?: string
    }) {
        this.id = `bs-modal-${Date.now()}`;

        this.title = title;
        this.body = body;
        this.type = type;
        this.inputValue = inputValue;
    }

    private createModal() {
        const html = `
            <div class="modal fade" id="${this.id}" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header"><h5 class="modal-title">${this.title}</h5></div>
                        <div class="modal-body">
                            <div>${this.body}</div>
                            ${this.type === "prompt" ? `<input class="form-control mt-2" value="${this.inputValue}">` : ""}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-action="ok">OK</button>
                            ${this.type !== "alert" ? `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" data-action="cancel">Cancel</button>` : ""}
                        </div>
                    </div>
                </div>
            </div>
        `;
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper.firstElementChild);
        const el = document.getElementById(this.id);
        const bsModal = new bootstrap.Modal(el, { backdrop: 'static', keyboard: true });
        
        this.modalElement = el;
        this.modal = bsModal;
    }

    private disposeModal() {
        try { this.modal.dispose(); } catch {}
        this.modalElement.remove();
    }

    public show() {
        return new Promise(resolve => {
            this.createModal();
            const okBtn = this.modalElement.querySelector('[data-action="ok"]');
            const cancelBtn = this.modalElement.querySelector('[data-action="cancel"]');
            const inputEl = this.modalElement.querySelector('input') as HTMLInputElement;
            this.modalElement.addEventListener("hidden.bs.modal", () => this.disposeModal(), { once: true });

            let done = (value: unknown) => { resolve(value); this.modal.hide(); };
            if (this.type === "prompt") {
                okBtn.addEventListener("click", () => done(inputEl ? inputEl.value : ""), { once: true });
            } else {
                okBtn.addEventListener("click", () => done(true), { once: true });
            }

            if (cancelBtn) {
                cancelBtn.addEventListener("click", () => { resolve(false); this.modal.hide(); }, { once: true });
            }

            this.modal.show();
        });
    }
}