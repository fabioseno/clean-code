import OrderCode from "../../src/domain/entity/order.code";

describe('orderCode', () => {
    test('Should generate a valid order code', () => {
        const issueDate = new Date('2022-02-28');
        const sequence = 1;
        const orderCode = new OrderCode(issueDate, sequence);
        expect(orderCode.value).toBe('202200000001');
    });
});