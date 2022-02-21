export class OrderItem {

    constructor(readonly name: string, readonly price: number, readonly quantity: number) {

    }

    getAmount() {
        return this.price * this.quantity;
    }

}