import Coupom from './coupom';
import Cpf from './cpf';
import Freight from './freight';
import Item from './item';
import OrderItem from './order-item';

export default class Order {

    cpf: Cpf;
    code: string = '';
    orderItems: OrderItem[] = [];
    private coupom?: Coupom;
    private freight: Freight = new Freight();

    constructor(cpf: string, private orderDate: Date = new Date()) {
        this.cpf = new Cpf(cpf);
    }

    createCode(lastOrderNumber: number) {
        this.code = `${this.orderDate.getFullYear()}${(lastOrderNumber + 1).toString().padStart(8, '0')}`;
        return this.code;
    }

    addItem(item: Item, quantity: number) {
        this.freight.addItem(new OrderItem(item, quantity))
        this.orderItems.push(new OrderItem(item, quantity));
    }

    applyCoupom(coupom: Coupom) {
        if (!coupom.isExpired(this.orderDate)) {
            this.coupom = coupom;
        }
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

    getShippingCost() {
        return this.freight.getTotal();
    }

}