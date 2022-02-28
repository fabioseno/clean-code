import Item from '../../src/domain/entity/item';
import Order from '../../src/domain/entity/order';
import Coupom from '../../src/domain/entity/coupom';

describe('order', () => {
    test('Should not allow invalid CPF', function () {
        expect(() => new Order('111.111.111-11')).toThrow('Invalid CPF');
    });

    test('Should allow order with 3 items', function () {
        const order = new Order('935.411.347-80');
        order.addItem(new Item('1', 'Camera', 30, 20, 10, 10, 1), 3);
        order.addItem(new Item('2', 'Guitarra', 20, 20, 100, 30, 3), 1);
        order.addItem(new Item('3', 'Geladeira', 40, 40, 200, 10, 40), 2);
        const totalAmount = order.getTotalAmount();
        expect(totalAmount).toBe(276);
    });

    test('Should allow order with 3 items with voucher', function () {
        const order = new Order('935.411.347-80');
        order.addItem(new Item('1', 'Camera', 30, 20, 10, 10, 1), 3);
        order.addItem(new Item('2', 'Guitarra', 20, 20, 100, 30, 3), 1);
        order.addItem(new Item('3', 'Geladeira', 40, 40, 200, 10, 40), 2);
        order.applyCoupom(new Coupom('VALE20', 20));
        const totalAmount = order.getTotalAmount();
        expect(totalAmount).toBe(238);
    });

    test('Should consider shipping', function () {
        const order = new Order('935.411.347-80');
        order.addItem(new Item('2', 'Guitarra', 20, 20, 100, 30, 3), 1);
        const shippingAmount = order.getTotalAmount();
        expect(shippingAmount).toBe(30);
    });

    test('Should consider shipping with minimum amount', function () {
        const order = new Order('935.411.347-80');
        order.addItem(new Item('1', 'Camera', 30, 10, 10, 10, 0.9), 1);
        const shippingAmount = order.getTotalAmount();
        expect(shippingAmount).toBe(40);
    });

    test('Should generate a valid order code', () => {
        const issueDate = new Date('2022-02-28');
        const order = new Order('935.411.347-80', issueDate);
        const lastOrderNumber = 13;
        order.createCode(lastOrderNumber);
        const orderCodeRegex = new RegExp(`${issueDate.getFullYear()}\\d{8}`);
        expect(orderCodeRegex.test(order.code)).toBeTruthy();
        expect(order.code).toBe(`${issueDate.getFullYear()}${(lastOrderNumber + 1).toString().padStart(8, '0')}`);
    });

});