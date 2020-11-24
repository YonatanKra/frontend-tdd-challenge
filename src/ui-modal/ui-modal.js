const template = document.createElement('template');
template.innerHTML = `
<style>
.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.42);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.overlay-hidden {
    display: none;
}

.content {
    background-color: white;
}
</style>

<div class="overlay overlay-hidden">
    <div class="content"></div>
</div>
`;

export class UiModal extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });

        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    open(innerHTML, width, height) {
        this._shadowRoot.querySelector('.overlay.overlay-hidden').className = 'overlay';

        const content = this._shadowRoot.querySelector('.content');

        content.innerHTML = innerHTML;
        content.style.width = `${width}px`;
        content.style.height = `${height}px`;
    }

    close() {
        this._shadowRoot.querySelector('.overlay').className = 'overlay overlay-hidden';
    }
}

window.customElements.define('ui-modal', UiModal);
