import CalculateShippingCost from "../../src/application/usecase/calulate-shipping-cost";
import CalulateShippingCostInput from "../../src/application/usecase/calulate-shipping-cost-input";
import Order from "../../src/domain/entity/order";
import ItemRepositoryMemory from "../../src/infra/repository/item-repository-memory";

test('Should calculate shipping cost', () => {
    const itemRepository = new ItemRepositoryMemory();
    const calulateShippingCostInput = new CalulateShippingCostInput('220.887.738-19', [
        { itemId: '1', quantity: 1 },
        { itemId: '2', quantity: 2 },
        { itemId: '3', quantity: 1 }
    ]);
    const calculateShippingCost = new CalculateShippingCost(itemRepository);
    const shippingCost = calculateShippingCost.execute(calulateShippingCostInput);
    expect(shippingCost).toBe(47);
});