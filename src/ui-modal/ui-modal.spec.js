import { UiModal } from './ui-modal';

describe('UiModal', () => {
    it(`should be defined`, () => {
        expect(UiModal).toBeDefined();
    });

    it(`should be a web component`, () => {
        expect(customElements.get('ui-modal')).toBeDefined();
    });

    it('should have an overlay', () => {
        const modal = window.document.createElement('ui-modal');
        const overlay = modal.shadowRoot.querySelectorAll('.overlay');

        expect(overlay.length).toEqual(1);
    });

    it('should have a content area', () => {
        const modal = window.document.createElement('ui-modal');
        const content = modal.shadowRoot.querySelectorAll('.content');

        expect(content.length).toEqual(1);
    });

    it('s overlay background color should be black with opacity (rgba(0, 0, 0, 0.42))', () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);

        const overlay = modal.shadowRoot.querySelector('.overlay');

        const backgroundColor = getComputedStyle(overlay).getPropertyValue('background-color');
        expect(backgroundColor).toEqual('rgba(0, 0, 0, 0.42)');
    });

    it('s content area should appear above the overlay', () => {
        const modal = window.document.createElement('ui-modal');
        const overlay = modal.shadowRoot.querySelector('.overlay');
        const content = overlay.querySelectorAll('.content');

        expect(content.length).toEqual(1);
        expect(overlay.children[0]).toEqual(content[0]);
        expect(content[0].parentElement).toEqual(overlay);
    });
});
