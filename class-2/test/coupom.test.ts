import Coupom from "../src/coupom";

describe('coupom', () => {

    test('Should test valid coupom', () => {
        const coupom = new Coupom('Code1', 20, new Date('2030-01-01'));
        expect(coupom.isExpired()).toBeFalsy();
    });

    test('Should test invalid coupom', () => {
        const coupom = new Coupom('Code1', 20, new Date('2010-01-01'));
        expect(coupom.isExpired()).toBeTruthy();
    });

    test('Should test empty coupom', () => {
        const coupom = new Coupom('Code1', 20);
        expect(coupom.isExpired()).toBeFalsy();
    });

});