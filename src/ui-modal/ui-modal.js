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
</style>

<div class="overlay">
    <div class="content"></div>
</div>
`;

export class UiModal extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        });

        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('ui-modal', UiModal);
