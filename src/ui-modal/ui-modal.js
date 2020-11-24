const template = document.createElement('template');
template.innerHTML = `
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
