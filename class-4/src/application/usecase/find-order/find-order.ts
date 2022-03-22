import { OrderStatus } from "../../../domain/entity/order";
import RepositoryFactory from "../../../domain/factory/repository-factory";
import OrderRepository from "../../../domain/repository/order-repository";
import FindOrderOutput from "./find-order-output";

export default class FindOrder {
    orderRepository: OrderRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
    }

    async execute(orderCode: string): Promise<FindOrderOutput> {
        const order = await this.orderRepository.find(orderCode);
        const findOrderOutput = new FindOrderOutput(order.cpf.value, order.orderDate, order.getTotalAmount(), order.code.value, order.status)
        return findOrderOutput;
    }

}