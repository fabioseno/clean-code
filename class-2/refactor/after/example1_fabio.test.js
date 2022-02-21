const ride = require('./example1_fabio');

test('Should calculate overnight fare', function () {
    let rate = ride.calc(100, new Date('2022-02-05T23:00:00'));
    expect(rate).toBe(100 * 3.9);
});

test('Should calculate sunday fare', function () {
    let rate = ride.calc(100, new Date('2022-02-06T20:00:00'));
    expect(rate).toBe(100 * 2.9);
});

test('Should calculate sunday overnight fare', function () {
    let rate = ride.calc(100, new Date('2022-02-06T23:00:00'));
    expect(rate).toBe(100 * 3.9);
});

test('Should calculate normal fare', function () {
    let rate = ride.calc(100, new Date('2022-02-04T20:00:00'));
    expect(rate).toBe(100 * 2.1);
});

test('Should throw error if distance is negative', function () {
    expect(() => ride.calc(-10, new Date('2022-02-04T20:00:00'))).toThrow(new Error('Invalid distance'));
});

test('Should throw error if distance is invalid', function () {
    expect(() => ride.calc('abc', new Date('2022-02-04T20:00:00'))).toThrow(new Error('Invalid distance'));
});

test('Should throw error if date is invalid', function () {
    expect(() => ride.calc(10, 'abc')).toThrow(new Error('Invalid date'));
});