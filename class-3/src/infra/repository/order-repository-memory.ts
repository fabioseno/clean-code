import Order from "../../domain/entity/order";
import OrderRepository from "../../domain/repository/order-repository";

export default class OrderRepositoryMemory implements OrderRepository {

    private orders: Order[] = [];

    save(order: Order): number {
        this.orders.push(order);
        return this.orders.length;
    }

}