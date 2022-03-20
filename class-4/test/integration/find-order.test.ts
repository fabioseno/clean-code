import FindOrder from "../../src/application/usecase/find-order/find-order";
import PlaceOrder from "../../src/application/usecase/place-order/place-order";
import PlaceOrderInput from "../../src/application/usecase/place-order/place-order-input";
import MemoryRepositoryFactory from "../../src/infra/factory/memory-repository-factory";

describe('findOrder', () => {
    test('Should find an order based on code', async () => {
        const memoryRepositoryFactory = new MemoryRepositoryFactory()
        const placeOrder = new PlaceOrder(memoryRepositoryFactory);

        const placeOrderInput = new PlaceOrderInput('220.887.738-19', [{ itemId: '1', quantity: 2 }]);
        const placeOrderOutput = await placeOrder.execute(placeOrderInput);
        const orderCode = placeOrderOutput.orderCode;
        const findOrder = new FindOrder(memoryRepositoryFactory);

        const order = await findOrder.execute(orderCode);
        expect(order?.code).toBe(orderCode);
    });
});