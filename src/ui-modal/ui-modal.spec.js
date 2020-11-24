import { UiModal } from './ui-modal';

describe('UiModal', () => {
    it(`should be defined`, () => {
        expect(UiModal).toBeDefined();
    });

    it(`should be a web component`, () => {
        const element = window.document.createElement('ui-modal');

        expect(customElements.get('ui-modal')).toBeDefined();
    });
});
