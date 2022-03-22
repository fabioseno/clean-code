import OrderRepository from "../../domain/repository/order-repository";
import Order, { OrderStatus } from "../../domain/entity/order";
import Item from "../../domain/entity/item";
import RepositoryFactory from "../../domain/factory/repository-factory";
import ItemRepository from "../../domain/repository/item-repository";

type ItemData = {
    itemId: string;
    quantity: number;
};
type OrderData = {
    cpf: string;
    orderDate: Date;
    code: string;
    total: number;
    sequence: number;
    items: ItemData[],
    status: string
}

export default class OrderRepositoryMemory implements OrderRepository {

    private orders: OrderData[] = [];

    constructor(readonly itemRepository: ItemRepository) { }

    async save(order: Order): Promise<number> {
        this.orders.push({
            cpf: order.cpf.value,
            orderDate: order.orderDate,
            code: order.code.value,
            total: order.getTotalAmount(),
            sequence: order.sequence,
            items: order.orderItems.map(orderItem => ({
                itemId: orderItem.item.id,
                quantity: orderItem.quantity
            })),
            status: order.status
        });
        return this.orders.length;
    }

    async cancel(orderCode: string): Promise<boolean | undefined> {
        const order = await this.orders.find(order => order.code === orderCode);

        if (!order) { return undefined; }
        order.status = OrderStatus.Canceled;

        return true;
    }

    async count(): Promise<number> {
        return this.orders.length;
    }

    async find(orderCode: string): Promise<Order> {
        const orderData = await this.orders.find(order => order.code === orderCode);
        if (!orderData) { throw new Error('Order not found'); }

        const order = new Order(orderData.cpf, orderData.orderDate, orderData.sequence);
        for (const orderItem of orderData.items) {
            const item = this.itemRepository.getById(orderItem.itemId);
            if (!item) throw new Error('Item not found');
            order.addItem(item, orderItem.quantity);
        }
        order.status = orderData.status as OrderStatus;
        return order;
    }

    list(): Promise<Order[]> {
        const promises = [];
        for (const orderData of this.orders) {
            promises.push(this.find(orderData.code));
        }
        return Promise.all(promises);
    }
}