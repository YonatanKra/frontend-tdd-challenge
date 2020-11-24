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

    it('s overlay background color should be black with opacity (rgba(0, 0, 0, 0.42)) if not specified', () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);
        
        modal.open();

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

    it('s content area should be in the center of the screen', () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);

        const overlay = modal.shadowRoot.querySelector('.overlay');

        const overlayStyles = getComputedStyle(overlay);
        expect(overlayStyles.getPropertyValue('justify-content')).toEqual('center');
        expect(overlayStyles.getPropertyValue('align-items')).toEqual('center');
    });

    it(`s content's background color should be white`, () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);

        const overlay = modal.shadowRoot.querySelector('.overlay');
        const content = overlay.querySelector('.content');

        const contentStyles = getComputedStyle(content);
        expect(contentStyles.getPropertyValue('background-color')).toEqual('rgb(255, 255, 255)');
    });

    it('should be invisible on init', () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);

        const overlay = modal.shadowRoot.querySelector('.overlay');
        const overlayStyles = getComputedStyle(overlay);

        expect(overlayStyles.display).toEqual('none');
    });

    it('turns the modal visible', () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);

        const overlay = modal.shadowRoot.querySelector('.overlay');
        
        modal.open();

        const overlayStyles = getComputedStyle(overlay);
        expect(overlayStyles.display).not.toEqual('none');
    });

    it('gets a string of HTML and add it to the content area', () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);

        const stringOfHtml = '<b>Some bold text</b>';
        
        modal.open(stringOfHtml);

        const content = modal.shadowRoot.querySelector('.content');
        expect(content.innerHTML).toEqual(stringOfHtml);
    });

    it(`should get width and height parameters and set the content's area accordingly`, () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);

        modal.open('Text', 420, 666);

        const overlay = modal.shadowRoot.querySelector('.overlay');
        const content = overlay.querySelector('.content');

        const contentStyles = getComputedStyle(content);
        expect(contentStyles.getPropertyValue('width')).toEqual('420px');
        expect(contentStyles.getPropertyValue('height')).toEqual('666px');
    });

    it(`should set the content's area to 250x250 pixels if not specified`, () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);

        modal.open('Text');

        const overlay = modal.shadowRoot.querySelector('.overlay');
        const content = overlay.querySelector('.content');

        const contentStyles = getComputedStyle(content);
        expect(contentStyles.getPropertyValue('width')).toEqual('250px');
        expect(contentStyles.getPropertyValue('height')).toEqual('250px');
    });

    it(`should get a background property and set the content's area's background accordingly`, () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);

        modal.open('Text', 420, 666, 'rgb(255, 0, 0)');

        const overlay = modal.shadowRoot.querySelector('.overlay');
        const content = overlay.querySelector('.content');

        const contentStyles = getComputedStyle(content);
        expect(contentStyles.getPropertyValue('background-color')).toEqual('rgb(255, 0, 0)');
    });

    it(`should get a showOverlay property and show/hide the overlay accordingly - true`, () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);

        modal.open('Text', 420, 666, 'rgb(255, 0, 0, 0.5)', true);

        const overlay = modal.shadowRoot.querySelector('.overlay');

        const overlayStyles = getComputedStyle(overlay);
        expect(overlayStyles.getPropertyValue('background-color')).toEqual('rgba(0, 0, 0, 0.42)');
    });

    it(`should get a showOverlay property and show/hide the overlay accordingly - false`, () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);

        modal.open('Text', 420, 666, 'rgb(255, 0, 0, 0.5)', false);

        const overlay = modal.shadowRoot.querySelector('.overlay');

        const overlayStyles = getComputedStyle(overlay);
        expect(overlayStyles.getPropertyValue('background-color')).toEqual('rgba(0, 0, 0, 0)');
    });

    it('turns the modal invisible', () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);

        modal.open();
        modal.close();

        const overlay = modal.shadowRoot.querySelector('.overlay');
        const overlayStyles = getComputedStyle(overlay);
        expect(overlayStyles.display).toEqual('none');
    });

    it('s overlay area should appear above all content of the website', () => {
        const modal = window.document.createElement('ui-modal');

        document.body.appendChild(modal);

        modal.open();

        const overlay = modal.shadowRoot.querySelector('.overlay');
        const overlayStyles = getComputedStyle(overlay);

        var all = document.getElementsByTagName("*");

        for (var i=0, max=all.length; i < max; i++) {
            const nodeStyles = getComputedStyle(all[i]);

            const calculatedZIndex = nodeStyles.zIndex === 'auto' ? 0 : nodeStyles.zIndex;

            expect(overlayStyles.zIndex).toBeGreaterThan(calculatedZIndex);
        }
    });
});
