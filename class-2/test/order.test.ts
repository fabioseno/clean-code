import Item from "../src/item";
import Order from "../src/order";
import Coupom from "../src/coupom";

describe('order', () => {
    test('Should not allow invalid CPF', function () {
        expect(() => new Order('111.111.111-11')).toThrow('Invalid CPF');
    });

    test('Should allow order with 3 items', function () {
        let order = new Order('935.411.347-80');
        order.addItem(new Item('1', 'Camera', 30, 20, 10, 10, 1), 3);
        order.addItem(new Item('2', 'Guitarra', 20, 20, 100, 30, 3), 1);
        order.addItem(new Item('3', 'Geladeira', 40, 40, 200, 10, 40), 2);
        const totalAmount = order.getTotalAmount();
        expect(totalAmount).toBe(276);
    });

    test('Should allow order with 3 items with voucher', function () {
        let order = new Order('935.411.347-80');
        order.addItem(new Item('1', 'Camera', 30, 20, 10, 10, 1), 3);
        order.addItem(new Item('2', 'Guitarra', 20, 20, 100, 30, 3), 1);
        order.addItem(new Item('3', 'Geladeira', 40, 40, 200, 10, 40), 2);
        order.applyCoupom(new Coupom('VALE20', 20));
        const totalAmount = order.getTotalAmount();
        expect(totalAmount).toBe(238);
    });

    test('Should consider shipping', function () {
        let order = new Order('935.411.347-80');
        order.addItem(new Item('2', 'Guitarra', 20, 20, 100, 30, 3), 1);
        const shippingAmount = order.getTotalAmount();
        expect(shippingAmount).toBe(30);
    });

    test('Should consider shipping with minimum amount', function () {
        let order = new Order('935.411.347-80');
        order.addItem(new Item('1', 'Camera', 30, 10, 10, 10, 0.9), 1);
        const shippingAmount = order.getTotalAmount();
        expect(shippingAmount).toBe(40);
    });

});