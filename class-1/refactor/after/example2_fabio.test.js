const validate = require('./example2_fabio');

test('Should validate null input', function () {
	expect(validate(null)).toBeFalsy();
});

test('Should validate empty input', function () {
	expect(validate('')).toBeFalsy();
});

test('Should validate undefined input', function () {
	expect(validate(undefined)).toBeFalsy();
});

test('Should validate invalid length', function () {
	expect(validate('1234')).toBeFalsy();
});

test('Should validate dummy CPF', function () {
	expect(validate("111.111.111-11")).toBeFalsy();
});

test('Should validate invalid CPF', function () {
	expect(validate("123.456.789-99")).toBeFalsy();
});

test('Should validate correct CPF', function () {
	expect(validate("935.411.347-80")).toBeTruthy();
});