import CancelOrder from "../../src/application/usecase/cancel-order/cancel-order";
import FindOrder from "../../src/application/usecase/find-order/find-order";
import PlaceOrder from "../../src/application/usecase/place-order/place-order";
import PlaceOrderInput from "../../src/application/usecase/place-order/place-order-input";
import MemoryRepositoryFactory from "../../src/infra/factory/memory-repository-factory";

describe('cancelOrder', () => {
    test('Should cancel order', async () => {
        const memoryRepositoryFactory = new MemoryRepositoryFactory();
        const placeOrder = new PlaceOrder(memoryRepositoryFactory);
        const placeOrderInput = new PlaceOrderInput('220.887.738-19', [
            { itemId: '1', quantity: 2 },
            { itemId: '2', quantity: 1 }
        ], undefined, new Date('2021-01-10'));
        const newOrder = await placeOrder.execute(placeOrderInput);
        
        const cancelOrder = new CancelOrder(memoryRepositoryFactory);
        cancelOrder.execute(newOrder.orderCode);

        const findOrder = new FindOrder(memoryRepositoryFactory);
        const existingOrder = await findOrder.execute(newOrder.orderCode);

        if (existingOrder) {
            expect(existingOrder.status).toBe('C');
        }
    });
});