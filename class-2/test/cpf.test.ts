import Cpf from "../src/cpf";

describe('cpf', () => {
    test('should handle empty CPF', () => {
        expect(() => new Cpf('')).toThrow(new Error('Invalid CPF'));
    });

    test('should recognize dummy CPF', () => {
        expect(() => new Cpf('111.111.111-11')).toThrow(new Error('Invalid CPF'));
    });

    test('should recognize invalid CPF length', () => {
        expect(() => new Cpf('111')).toThrow(new Error('Invalid CPF'));
    });

    test('should recognize invalid CPF', () => {
        expect(() => new Cpf('123.456.789-99')).toThrow(new Error('Invalid CPF'));
    });

    test('should accept valid CPF', () => {
        const cpf = new Cpf('935.411.347-80');
        expect(cpf.getValue()).toBe('935.411.347-80');
    });
});