import CouponRepositoryMemory from '../../src/infra/repository/coupon-repository-memory';
import ItemRepositoryMemory from '../../src/infra/repository/item-repository-memory';
import OrderRepositoryMemory from '../../src/infra/repository/order-repository-memory';
import PlaceOrder from '../../src/application/usecase/place-order';

test('should place new order', () => {
    const itemRepository = new ItemRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    const placeOrderInput = {
        cpf: '220.887.738-19',
        items: [
            { itemId: '1', quantity: 1 },
            { itemId: '2', quantity: 2 },
            { itemId: '3', quantity: 1 },
        ],
        coupon: 'VALE20'
    };
    const ouput = placeOrder.execute(placeOrderInput);
    expect(ouput.total).toBe(135);
});