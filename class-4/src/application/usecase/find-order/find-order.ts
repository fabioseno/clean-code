import OrderRepository from "../../../domain/repository/order-repository";
import FindOrderOutput from "./find-order-output";

export default class FindOrder {

    constructor(readonly orderRepository: OrderRepository) { }

    execute(orderCode: string): Promise<FindOrderOutput | undefined> {
        return this.orderRepository.find(orderCode);
    }

}