const { validateCpf } = require('./cpf');

describe('cpf', () => {
    test('should handle empty CPF', () => {
        let isValid = validateCpf('');
        expect(isValid).toBeFalsy();
    });

    test('should handle null CPF', () => {
        let isValid = validateCpf(null);
        expect(isValid).toBeFalsy();
    });

    test('should handle undefined CPF', () => {
        let isValid = validateCpf(undefined);
        expect(isValid).toBeFalsy();
    });

    test('should recognize dummy CPF', () => {
        let isValid = validateCpf('111.111.111-11');
        expect(isValid).toBeFalsy();
    });

    test('should recognize invalid CPF length', () => {
        let isValid = validateCpf('111');
        expect(isValid).toBeFalsy();
    });

    test('should recognize invalid CPF', () => {
        let isValid = validateCpf('123.456.789-99');
        expect(isValid).toBeFalsy();
    });

    test('should accept valid CPF', () => {
        let isValid = validateCpf('935.411.347-80');
        expect(isValid).toBeTruthy();
    });
});