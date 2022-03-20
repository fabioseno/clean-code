import RepositoryFactory from "../../../domain/factory/repository-factory";
import OrderRepository from "../../../domain/repository/order-repository";
import ListOrdersOutput from "./list-orders-output";

export default class ListOrders {
    orderRepository: OrderRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
     }

    execute(): Promise<ListOrdersOutput[]> {
        return this.orderRepository.list();
    }

}