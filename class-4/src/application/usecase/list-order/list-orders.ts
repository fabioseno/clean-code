import RepositoryFactory from "../../../domain/factory/repository-factory";
import OrderRepository from "../../../domain/repository/order-repository";
import ListOrdersOutput from "./list-orders-output";

export default class ListOrders {
    orderRepository: OrderRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
    }

    async execute(): Promise<ListOrdersOutput[]> {
        const orders = await this.orderRepository.list();
        const outputOrders = [];
        for (const order of orders) {
            const listOrdersOutput = new ListOrdersOutput(order.cpf.value, order.orderDate, order.getTotalAmount(), order.code.value);
            outputOrders.push(listOrdersOutput);
        }
        return outputOrders;
    }

}