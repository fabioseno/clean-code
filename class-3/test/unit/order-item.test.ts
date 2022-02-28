import Item from '../../src/domain/entity/item';
import OrderItem from '../../src/domain/entity/order-item';

describe('order-item', () => {
    test('should get amount', () => {
        const item = new OrderItem(new Item('id', 'name', 100, 100, 100, 100, 100), 3);
        expect(item.getAmount()).toBe(300);
    });
});