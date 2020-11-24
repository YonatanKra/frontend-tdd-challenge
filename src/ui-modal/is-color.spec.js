import { isColor } from './is-color';

describe('isColor', () => {
    describe('valid color examples', () => {
        const validExamples = [
            '#000',
            '#ffffff',
            '#FFFFFF',
            'rgba(255, 255, 255, 0)',
            'rgb(255, 255, 0)',
            'red',
            'RED'
        ]

        validExamples.forEach((example) => {
            it(`${example} - should be valid color`, () => {
                expect(isColor(example)).toEqual(true);
            });
        });
    });

    describe('invalid color examples', () => {
        const invalid = [
            '#g00',
            '#gfffff',
            '#GFFFFF',
            'mleczarz',
        ]

        invalid.forEach((example) => {
            it(`${example} - should be invalid color`, () => {
                expect(isColor(example)).toEqual(false);
            });
        });
    });
});