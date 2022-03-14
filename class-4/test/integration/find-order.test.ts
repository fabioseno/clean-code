import FindOrder from "../../src/application/usecase/find-order/find-order";
import PlaceOrder from "../../src/application/usecase/place-order/place-order";
import PlaceOrderInput from "../../src/application/usecase/place-order/place-order-input";
import CouponRepositoryMemory from "../../src/infra/repository/coupon-repository-memory";
import ItemRepositoryMemory from "../../src/infra/repository/item-repository-memory";
import OrderRepositoryMemory from "../../src/infra/repository/order-repository-memory";

describe('findOrder', () => {
    test('Should find an order based on code', async () => {
        const orderRepository = new OrderRepositoryMemory();
        const itemRepository = new ItemRepositoryMemory();
        const couponRepository = new CouponRepositoryMemory();
        const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);

        const placeOrderInput = new PlaceOrderInput('220.887.738-19', [{ itemId: '1', quantity: 2 }]);
        const placeOrderOutput = await placeOrder.execute(placeOrderInput);
        const orderCode = placeOrderOutput.orderCode;
        const findOrder = new FindOrder(orderRepository);

        const order = await findOrder.execute(orderCode);
        expect(order?.code).toBe(orderCode);
    });
});