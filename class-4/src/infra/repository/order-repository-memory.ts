import FindOrderOutput from "../../application/usecase/find-order/find-order-output";
import OrderRepository from "../../domain/repository/order-repository";
import Order, { OrderStatus } from "../../domain/entity/order";

export default class OrderRepositoryMemory implements OrderRepository {

    private orders: Order[] = [];

    async save(order: Order): Promise<number> {
        this.orders.push(order);
        return this.orders.length;
    }

    async cancel(orderCode: string): Promise<boolean | undefined> {
        const order = await this.orders.find(order => order.code.value === orderCode);

        if (!order) { return undefined; }
        order.status = OrderStatus.Canceled;

        return true;
    }

    async count(): Promise<number> {
        return this.orders.length;
    }

    async find(orderCode: string): Promise<FindOrderOutput | undefined> {
        const order = await this.orders.find(order => order.code.value === orderCode);

        if (!order) { return undefined; }

        return new FindOrderOutput(order.cpf.value, order.orderDate, order.getTotalAmount(), order.code.value, order.status);
    }

    async list(): Promise<FindOrderOutput[]> {
        return this.orders.map(order => {
            return new FindOrderOutput(order.cpf.value, order.orderDate, order.getTotalAmount(), order.code.value, order.status);
        })
    }
}