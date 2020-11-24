const template = document.createElement('template');
template.innerHTML = `
<style>
.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99999;
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

    open(innerHTML, width = 250, height = 250, background = "rgba(255, 255, 255)", showOverlay = true) {
        const overlay = this._shadowRoot.querySelector('.overlay.overlay-hidden')
        overlay.className = 'overlay';
        overlay.style.background = showOverlay ? 'rgba(0, 0, 0, 0.42)' : 'rgba(0, 0, 0, 0)'; 

        const content = this._shadowRoot.querySelector('.content');

        content.innerHTML = innerHTML;
        content.style.width = `${width}px`;
        content.style.height = `${height}px`;
        content.style.background = background;
    }

    close() {
        this._shadowRoot.querySelector('.overlay').className = 'overlay overlay-hidden';
    }
}

window.customElements.define('ui-modal', UiModal);
