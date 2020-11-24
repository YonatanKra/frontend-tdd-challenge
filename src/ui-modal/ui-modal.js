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
    width: 250px;
    height: 250px;
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

    open() {
        this._shadowRoot.querySelector('.overlay.overlay-hidden').className = 'overlay';
    }
}

window.customElements.define('ui-modal', UiModal);
