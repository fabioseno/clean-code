import { validateCpf } from './cpf';
import { OrderItem } from './order-item';

export default class Order {

    totalAmount = 0;

    constructor(cpf: string) {
        if (!validateCpf(cpf)) throw new Error('Invalid CPF');
    }

    addItem(orderItem: OrderItem) {
        this.totalAmount += orderItem.getAmount();
    }

    applyVoucher(discount: number) {
        this.totalAmount -= (this.totalAmount * discount / 100);
    }

}