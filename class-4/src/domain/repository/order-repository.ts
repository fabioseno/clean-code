import FindOrderOutput from "../../application/usecase/find-order/find-order-output";
import Order from "../entity/order";

export default interface OrderRepository {

    save(order: Order): Promise<number>;
    count(): Promise<number>;
    find(orderCode: string): Promise<FindOrderOutput | undefined>;
    list(): Promise<FindOrderOutput[]>;

}