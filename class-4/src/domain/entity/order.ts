import Coupom from './coupom';
import Cpf from './cpf';
import Freight from './freight';
import Item from './item';
import OrderItem from './order-item';
import OrderCode from './order.code';

export enum OrderStatus {
    Processing = 'P',
    Canceled = 'C'
};

export default class Order {

    cpf: Cpf;
    orderItems: OrderItem[] = [];
    private coupom?: Coupom;
    private freight: Freight = new Freight();
    code: OrderCode;
    private _status: OrderStatus = OrderStatus.Processing;

    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }

    constructor(cpf: string, readonly orderDate: Date = new Date(), readonly sequence: number = 1) {
        this.cpf = new Cpf(cpf);
        this.code = new OrderCode(orderDate, sequence);
    }

    addItem(item: Item, quantity: number) {
        if (quantity < 0) throw new Error('Invalid quantity');
        if (this.orderItems.find(orderItem => orderItem.item.id === item.id)) throw new Error('Item already added');
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