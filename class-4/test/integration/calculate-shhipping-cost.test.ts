import CalculateShippingCost from "../../src/application/usecase/calulate-shipping-cost/calulate-shipping-cost";
import CalulateShippingCostInput from "../../src/application/usecase/calulate-shipping-cost/calulate-shipping-cost-input";
import ItemRepositoryMemory from "../../src/infra/repository/item-repository-memory";

test('Should calculate shipping cost', () => {
    const itemRepository = new ItemRepositoryMemory();
    const calulateShippingCostInput = new CalulateShippingCostInput('220.887.738-19', [
        { itemId: '1', quantity: 1 },
        { itemId: '2', quantity: 2 },
        { itemId: '3', quantity: 1 }
    ]);
    const calculateShippingCost = new CalculateShippingCost(itemRepository);
    const output = calculateShippingCost.execute(calulateShippingCostInput);
    expect(output.total).toBe(47);
});