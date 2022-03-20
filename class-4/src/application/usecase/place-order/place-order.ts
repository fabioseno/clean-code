import CouponRepository from "../../../domain/repository/coupon-repository";
import ItemRepository from "../../../domain/repository/item-repository";
import OrderRepository from "../../../domain/repository/order-repository";
import Order, { OrderStatus } from "../../../domain/entity/order";
import PlaceOrderInput from "./place-order-input";
import PlaceOrderOutput from "./place-order-output";
import InventoryRepository from "../../../domain/repository/inventory-repository";
import RepositoryFactory from "../../../domain/factory/repository-factory";

export default class PlaceOrder {

    couponRepository: CouponRepository;
    itemRepository: ItemRepository;
    inventoryRepository: InventoryRepository;
    orderRepository: OrderRepository;
    protected status: OrderStatus = OrderStatus.Processing;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.couponRepository = repositoryFactory.createCouponRepository();
        this.itemRepository = repositoryFactory.createItemRepository();
        this.inventoryRepository = repositoryFactory.createInventoryRepository();
        this.orderRepository = repositoryFactory.createOrderRepository();
    }

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const sequence = await this.orderRepository.count() + 1;
        const order = new Order(input.cpf, input.issueDate, sequence);
        input.items.forEach(orderItem => {
            const item = this.itemRepository.getById(orderItem.itemId);
            if (!item) throw new Error('Item not found');
            order.addItem(item, orderItem.quantity);
            this.inventoryRepository.decreaseItemStock(item.id, orderItem.quantity);
        });
        if (input.coupon) {
            const coupon = this.couponRepository.getByCode(input.coupon);
            if (coupon) order.applyCoupom(coupon);
        }
        const orderTotal = order.getTotalAmount();
        this.orderRepository.save(order);
        this.status = OrderStatus.Processing;
        const placeOrderOutput = new PlaceOrderOutput(order.code.value, orderTotal);
        return placeOrderOutput;
    }
}