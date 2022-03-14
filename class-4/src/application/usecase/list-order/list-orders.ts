import OrderRepository from "../../../domain/repository/order-repository";
import ListOrdersOutput from "./list-orders-output";

export default class ListOrders {

    constructor(readonly orderRepository: OrderRepository) { }

    execute(): Promise<ListOrdersOutput[]> {
        return this.orderRepository.list();
    }

}