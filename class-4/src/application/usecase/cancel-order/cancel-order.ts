import RepositoryFactory from "../../../domain/factory/repository-factory";

export default class CancelOrder {

    constructor(readonly repositoryFactory: RepositoryFactory) {

    }

    execute(orderCode: string) {
        const orderRepository = this.repositoryFactory.createOrderRepository();
        return orderRepository.cancel(orderCode);
    }

}