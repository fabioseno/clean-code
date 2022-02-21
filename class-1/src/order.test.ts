import Order from "./order";
import { OrderItem } from "./order-item";

describe('order', () => {
    test('should not allow invalid CPF', () => {
        expect(() => new Order('111')).toThrow(new Error('Invalid CPF'));
    });

    test('should accept 3 items', () => {
        const order = new Order('220.887.738-19');
        order.addItem(new OrderItem('Guitarra', 1000, 1));
        order.addItem(new OrderItem('Baixo', 800, 1));
        order.addItem(new OrderItem('Palheta', 10, 3));
        expect(order.totalAmount).toBe(1830);
    });

    test('should apply discount', () => {
        const order = new Order('220.887.738-19');
        order.addItem(new OrderItem('Guitarra', 1000, 1));
        order.addItem(new OrderItem('Baixo', 800, 1));
        order.addItem(new OrderItem('Palheta', 10, 3));
        order.applyVoucher(20);
        expect(order.totalAmount).toBe(1464);
    });
});