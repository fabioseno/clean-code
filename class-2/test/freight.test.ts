import Freight from "../src/freight";
import Item from "../src/item";
import OrderItem from "../src/order-item";

describe('freight-calculator', () => {
    test('Should calculate shipping', function () {
        const freight = new Freight();
        freight.addItem(new OrderItem(new Item('2', 'Guitarra', 1000, 100, 30, 10, 3), 1));
        expect(freight.getTotal()).toBe(10);
    });

    test('Should calculate shipping with minimum amount', function () {
        const freight = new Freight();
        freight.addItem(new OrderItem(new Item('2', 'Guitarra', 30, 10, 10, 10, 0.9), 1));
        expect(freight.getTotal()).toBe(10);
    });
});