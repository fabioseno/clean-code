const OVERTNIGHT_RATE = 3.90;
const SUNDAY_RATE = 2.9;
const NORMAL_RATE = 2.1;

function isOvernight(date) {
    return date.getHours() >= 22;
}

function isSunday(date) {
    return date.getDay() === 0;
}

exports.calc = function (distance, date) {
    if (isNaN(distance) || distance < 0) throw new Error('Invalid distance');
    if (!(date instanceof Date)) throw new Error('Invalid date');
    if (isOvernight(date)) return distance * OVERTNIGHT_RATE;
    if (isSunday(date)) return distance * SUNDAY_RATE;
    return distance * NORMAL_RATE;
}