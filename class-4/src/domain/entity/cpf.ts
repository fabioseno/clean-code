export default class Cpf {
    private FACTOR_DIGIT_1 = 10;
    private FACTOR_DIGIT_2 = 11;

    readonly value;

    constructor(private input: string) {
        if (!this.validate()) throw new Error('Invalid CPF');

        this.value = input;
    }

    private validate() {
        if (!this.input) return false;
        this.input = this.sanitizeCpf();
        if (!this.hasValidLength()) return false;
        if (this.isDummyCPF()) return false;
        const digit1 = this.calculateDigit(this.FACTOR_DIGIT_1);
        const digit2 = this.calculateDigit(this.FACTOR_DIGIT_2);
        const actualDigit = this.input.slice(this.input.length - 2);
        return `${digit1}${digit2}` === actualDigit;
    }

    private sanitizeCpf() {
        return this.input.replace(/\D/g, '');
    }

    private hasValidLength() {
        return this.input.length === 11;
    }

    private isDummyCPF() {
        const firstDigit = this.input[0];
        return this.input.split('').every(digit => digit === firstDigit);
    }

    private calculateDigit(multiplier: number) {
        let sum = 0;
        for (const digit of this.input) {
            if (multiplier >= 2) {
                sum += +digit * multiplier--;
            }
        }
        let rest = sum % 11;
        return rest < 2 ? 0 : (11 - rest);
    }
}