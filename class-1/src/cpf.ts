export function validateCpf(rawValue: string) {
    if (!rawValue) return false;
    const value = sanitizeCpf(rawValue);
    if (!hasValidLength(value)) return false;
    if (isDummyCPF(value)) return false;
    const digit1 = calculateDigit(value, 10);
    const digit2 = calculateDigit(value, 11);
    const actualDigit = value.slice(value.length - 2);
    return `${digit1}${digit2}` === actualDigit;
}

function sanitizeCpf(value: string) {
    return value.replace(/\D/g, '');
}

function hasValidLength(value: string) {
    return value.length === 11;
}

function isDummyCPF(value: string) {
    const firstDigit = value[0];
    return value.split('').every(digit => digit === firstDigit);
}

function calculateDigit(value: string, multiplier: number) {
    let sum = 0;
    for (const digit of value) {
        if (multiplier >= 2) {
            sum += +digit * multiplier--;
        }
    }
    let rest = sum % 11;
    return rest < 2 ? 0 : (11 - rest);
}