import { UiModal } from './ui-modal';

const createAndRenderModal = () => {
    const modal = window.document.createElement('ui-modal');

    document.body.appendChild(modal);

    return modal;
}

describe('UiModal', () => {
    afterEach(() => {
        const uiModalInDom = window.document.querySelector('ui-modal');
        if (uiModalInDom) {
            uiModalInDom.remove();
        }
    });

    describe('basics', () => {
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

        it('should be invisible on init', () => {
            const modal = createAndRenderModal();
    
            const overlay = modal.shadowRoot.querySelector('.overlay');
            const overlayStyles = getComputedStyle(overlay);
    
            expect(overlayStyles.display).toEqual('none');
        });

        it('should turn the modal invisible', () => {
            const modal = createAndRenderModal();
    
            modal.open();
            modal.close();
    
            const overlay = modal.shadowRoot.querySelector('.overlay');
            const overlayStyles = getComputedStyle(overlay);
            expect(overlayStyles.display).toEqual('none');
        });
    });

    describe('common styling', () => {
        it('its content area should appear above the overlay', () => {
            const modal = window.document.createElement('ui-modal');
            const overlay = modal.shadowRoot.querySelector('.overlay');
            const content = overlay.querySelectorAll('.content');
    
            expect(content.length).toEqual(1);
            expect(overlay.children[0]).toEqual(content[0]);
            expect(content[0].parentElement).toEqual(overlay);
        });
    
        it('its content area should be in the center of the screen', () => {
            const modal = createAndRenderModal();
    
            const overlay = modal.shadowRoot.querySelector('.overlay');
    
            const overlayStyles = getComputedStyle(overlay);
            expect(overlayStyles.getPropertyValue('justify-content')).toEqual('center');
            expect(overlayStyles.getPropertyValue('align-items')).toEqual('center');
        });

        it('its overlay background color should be black with opacity (rgba(0, 0, 0, 0.42)) if not specified', () => {
            const modal = createAndRenderModal();
            
            modal.open();
    
            const overlay = modal.shadowRoot.querySelector('.overlay');
    
            const backgroundColor = getComputedStyle(overlay).getPropertyValue('background-color');
            expect(backgroundColor).toEqual('rgba(0, 0, 0, 0.42)');
        });

        it('its overlay area should appear above all content of the website', () => {
            const modal = createAndRenderModal();
    
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

    describe('gets a string of HTML and add it to the content area', () => {
        it(`sets given string to be modal's content`, () => {
            const modal = createAndRenderModal();

            const stringOfHtml = '<b>Some bold text</b>';

            modal.open(stringOfHtml);

            const content = modal.shadowRoot.querySelector('.content');
            expect(content.innerHTML).toEqual(stringOfHtml);
        });

        it('throws if parameter for open method is not a string', () => {
            const modal = createAndRenderModal();

            const notStringOfHtml = 420;

            expect(() => {
                modal.open(notStringOfHtml);
            }).toThrowError(`innerHTML argument has to be a string. 'number' given`);
        });
    });

    describe(`should get width and height parameters and set the content's area accordingly`, () => {
        it(`sets the content's area accordingly to given parameters`, () => {
            const modal = createAndRenderModal();
    
            modal.open('Text', 420, 666);
    
            const overlay = modal.shadowRoot.querySelector('.overlay');
            const content = overlay.querySelector('.content');
    
            const contentStyles = getComputedStyle(content);
            expect(contentStyles.getPropertyValue('width')).toEqual('420px');
            expect(contentStyles.getPropertyValue('height')).toEqual('666px');
        });

        it(`sets the content's area to 250x250 pixels if parameters not specified`, () => {
            const modal = createAndRenderModal();
    
            modal.open('Text');
    
            const overlay = modal.shadowRoot.querySelector('.overlay');
            const content = overlay.querySelector('.content');
    
            const contentStyles = getComputedStyle(content);
            expect(contentStyles.getPropertyValue('width')).toEqual('250px');
            expect(contentStyles.getPropertyValue('height')).toEqual('250px');
        });

        it(`throws the error if width is not a number type`, () => {
            const modal = createAndRenderModal();
    
            const notNumber = 'notNumber';
    
            expect(() => {
                modal.open('Text', notNumber, 666);
            }).toThrowError(`width argument has to be a number. 'string' given`);
        });

        it(`throws the error if height is not a number type`, () => {
            const modal = createAndRenderModal();
    
            const notNumber = 'notNumber';
    
            expect(() => {
                modal.open('Text', 420, notNumber);
            }).toThrowError(`height argument has to be a number. 'string' given`);
        });    
    })

    describe(`should get a background property and set the content's area's background accordingly`, () => {
        it(`sets the background of the content's area accordingly to parameter`, () => {
            const modal = createAndRenderModal();
    
            modal.open('Text', 420, 666, 'rgb(255, 0, 0)');
    
            const overlay = modal.shadowRoot.querySelector('.overlay');
            const content = overlay.querySelector('.content');
    
            const contentStyles = getComputedStyle(content);
            expect(contentStyles.getPropertyValue('background-color')).toEqual('rgb(255, 0, 0)');
        });

        it(`sets content's background to white if parameter is not specified`, () => {
            const modal = createAndRenderModal();
    
            const overlay = modal.shadowRoot.querySelector('.overlay');
            const content = overlay.querySelector('.content');
    
            const contentStyles = getComputedStyle(content);
            expect(contentStyles.getPropertyValue('background-color')).toEqual('rgb(255, 255, 255)');
        });

        it(`throws the error if background property is not a valid color`, () => {
            const modal = createAndRenderModal();
    
            expect(() => {
                modal.open('Text', 420, 666, 'niekolor');
            }).toThrowError('');
        });
    });

    describe(`should get a showOverlay property and show/hide the overlay accordingly `, () => {
        it(`sets the overlay to be visible`, () => {
            const modal = createAndRenderModal();
    
            modal.open('Text', 420, 666, 'rgb(255, 0, 0, 0.5)', true);
    
            const overlay = modal.shadowRoot.querySelector('.overlay');
    
            const overlayStyles = getComputedStyle(overlay);
            expect(overlayStyles.getPropertyValue('background-color')).toEqual('rgba(0, 0, 0, 0.42)');
        });

        it(`sets the overlay to be invisible`, () => {
            const modal = createAndRenderModal();
    
            modal.open('Text', 420, 666, 'rgb(255, 0, 0, 0.5)', false);
    
            const overlay = modal.shadowRoot.querySelector('.overlay');
    
            const overlayStyles = getComputedStyle(overlay);
            expect(overlayStyles.getPropertyValue('background-color')).toEqual('rgba(0, 0, 0, 0)');
        });
    })
});
