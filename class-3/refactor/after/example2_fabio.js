function validate(value) {
    if (!value) return false;
    value = cleanFormat(value);
    if (hasValidLength(value)) return false;
    if (isDummyCPF(value)) return false;
    let d1, d2;
    let dg1, dg2, rest;
    let digito;
    let nDigResult;
    d1 = d2 = 0;
    dg1 = dg2 = rest = 0;

    for (let nCount = 1; nCount < value.length - 1; nCount++) {
        // if (isNaN(parseInt(str.substring(nCount -1, nCount)))) {
        // 	return false;
        // } else {

        digito = parseInt(value.substring(nCount - 1, nCount));
        d1 = d1 + (11 - nCount) * digito;

        d2 = d2 + (12 - nCount) * digito;
        // }
    };

    rest = (d1 % 11);

    dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;
    d2 += 2 * dg1;
    rest = (d2 % 11);
    if (rest < 2)
        dg2 = 0;
    else
        dg2 = 11 - rest;

    let nDigVerific = value.substring(value.length - 2, value.length);
    nDigResult = "" + dg1 + "" + dg2;
    return nDigVerific == nDigResult;
}

function cleanFormat(value) {
    return value.replace(/\D/g, '');
}

function hasValidLength(value) {
    return (value.length !== 11);
}

function isDummyCPF(value) {
    const firstDigit = value[0];
    return value.split('').every(digit => digit === firstDigit);
}

module.exports = validate;