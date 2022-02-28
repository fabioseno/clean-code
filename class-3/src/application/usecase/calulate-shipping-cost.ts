import Order from "../../domain/entity/order";
import ItemRepository from "../../domain/repository/item-repository";
import CalulateShippingCostInput from "./calulate-shipping-cost-input";

export default class CalculateShippingCost {

    constructor(readonly itemRepository: ItemRepository) { }

    execute(calulateShippingCostInput: CalulateShippingCostInput) {
        const order = new Order(calulateShippingCostInput.cpf);
        for (const orderItem of calulateShippingCostInput.items) {
            const item = this.itemRepository.getById(orderItem.itemId);
            if (!item) throw new Error('Item not found');
            order.addItem(item, orderItem.quantity);
        }
        return order.getShippingCost();
    }
}