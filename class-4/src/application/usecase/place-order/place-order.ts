import CouponRepository from "../../../domain/repository/coupon-repository";
import ItemRepository from "../../../domain/repository/item-repository";
import OrderRepository from "../../../domain/repository/order-repository";
import Order from "../../../domain/entity/order";
import PlaceOrderInput from "./place-order-input";
import PlaceOrderOutput from "./place-order-output";

export default class PlaceOrder {

    constructor(readonly itemRepository: ItemRepository,
        readonly orderRepository: OrderRepository,
        readonly couponRepository: CouponRepository) {
    }

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const sequence = await this.orderRepository.count() + 1;
        const order = new Order(input.cpf, input.issueDate, sequence);
        input.items.forEach(orderItem => {
            const item = this.itemRepository.getById(orderItem.itemId);
            if (!item) throw new Error('Item not found');
            order.addItem(item, orderItem.quantity);
        });
        if (input.coupon) {
            const coupon = this.couponRepository.getByCode(input.coupon);
            if (coupon) order.applyCoupom(coupon);
        }
        const orderTotal = order.getTotalAmount();
        this.orderRepository.save(order);
        const placeOrderOutput = new PlaceOrderOutput(order.code.value, orderTotal);
        return placeOrderOutput;
    }
}