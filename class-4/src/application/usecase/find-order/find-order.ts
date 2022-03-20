import RepositoryFactory from "../../../domain/factory/repository-factory";
import OrderRepository from "../../../domain/repository/order-repository";
import FindOrderOutput from "./find-order-output";

export default class FindOrder {
    orderRepository: OrderRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
    }

    execute(orderCode: string): Promise<FindOrderOutput | undefined> {
        return this.orderRepository.find(orderCode);
    }

}