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
});
