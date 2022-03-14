import FindOrder from "../../src/application/usecase/find-order/find-order";
import ListOrders from "../../src/application/usecase/list-order/list-orders";
import PlaceOrder from "../../src/application/usecase/place-order/place-order";
import PlaceOrderInput from "../../src/application/usecase/place-order/place-order-input";
import CouponRepositoryMemory from "../../src/infra/repository/coupon-repository-memory";
import ItemRepositoryMemory from "../../src/infra/repository/item-repository-memory";
import OrderRepositoryMemory from "../../src/infra/repository/order-repository-memory";

describe('findOrder', () => {
    test('Should return all orders', async () => {
        const orderRepository = new OrderRepositoryMemory();
        const itemRepository = new ItemRepositoryMemory();
        const couponRepository = new CouponRepositoryMemory();
        const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);

        const placeOrderInput = new PlaceOrderInput('220.887.738-19', [{ itemId: '1', quantity: 2 }]);
        await placeOrder.execute(placeOrderInput);
        await placeOrder.execute(placeOrderInput);
        const listOrders = new ListOrders(orderRepository);
        const listOrdersOutput = await listOrders.execute();
        expect(listOrdersOutput.length).toBe(2);
    });
});