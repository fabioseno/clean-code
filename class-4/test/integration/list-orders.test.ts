import ListOrders from "../../src/application/usecase/list-order/list-orders";
import PlaceOrder from "../../src/application/usecase/place-order/place-order";
import PlaceOrderInput from "../../src/application/usecase/place-order/place-order-input";
import MemoryRepositoryFactory from "../../src/infra/factory/memory-repository-factory";

describe('findOrder', () => {
    test('Should return all orders', async () => {
        const memoryRepositoryFactory = new MemoryRepositoryFactory()
        const placeOrder = new PlaceOrder(memoryRepositoryFactory);

        const placeOrderInput = new PlaceOrderInput('220.887.738-19', [{ itemId: '1', quantity: 2 }]);
        await placeOrder.execute(placeOrderInput);
        await placeOrder.execute(placeOrderInput);
        const listOrders = new ListOrders(memoryRepositoryFactory);
        const listOrdersOutput = await listOrders.execute();
        expect(listOrdersOutput.length).toBe(2);
    });
});