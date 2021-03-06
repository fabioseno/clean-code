import Coupom from './coupom';
import Cpf from './cpf';
import Freight from './freight';
import Item from './item';
import OrderItem from './order-item';

export default class Order {

    cpf: Cpf;
    orderItems: OrderItem[] = [];
    private coupom?: Coupom;
    private freight: Freight = new Freight();

    constructor(cpf: string) {
        this.cpf = new Cpf(cpf);
    }

    addItem(item: Item, quantity: number) {
        this.freight.addItem(new OrderItem(item, quantity))
        this.orderItems.push(new OrderItem(item, quantity));
    }

    applyCoupom(coupom: Coupom) {
        this.coupom = coupom;
    }

    getTotalAmount() {
        let totalAmount = 0;

        for (const orderItem of this.orderItems) {
            totalAmount += orderItem.getAmount();
        }

        if (this.coupom) {
            totalAmount -= (totalAmount * this.coupom.discountPercentage / 100);
        }

        totalAmount += this.freight.getTotal();

        return totalAmount;
    }


}