export default class Cpf {
    private FACTOR_DIGIT_1 = 10;
    private FACTOR_DIGIT_2 = 11;

    private cpf;

    constructor(readonly value: string) {
        if (!this.validate(value)) throw new Error('Invalid CPF');

        this.cpf = value;
    }

    getValue() {
        return this.cpf;
    }

    private validate(cpf: string) {
        if (!cpf) return false;
        const value = this.sanitizeCpf(cpf);
        if (!this.hasValidLength(value)) return false;
        if (this.isDummyCPF(value)) return false;
        const digit1 = this.calculateDigit(value, this.FACTOR_DIGIT_1);
        const digit2 = this.calculateDigit(value, this.FACTOR_DIGIT_2);
        const actualDigit = value.slice(value.length - 2);
        return `${digit1}${digit2}` === actualDigit;
    }

    private sanitizeCpf(value: string) {
        return value.replace(/\D/g, '');
    }

    private hasValidLength(value: string) {
        return value.length === 11;
    }

    private isDummyCPF(value: string) {
        const firstDigit = value[0];
        return value.split('').every(digit => digit === firstDigit);
    }

    private calculateDigit(value: string, multiplier: number) {
        let sum = 0;
        for (const digit of value) {
            if (multiplier >= 2) {
                sum += +digit * multiplier--;
            }
        }
        let rest = sum % 11;
        return rest < 2 ? 0 : (11 - rest);
    }
}