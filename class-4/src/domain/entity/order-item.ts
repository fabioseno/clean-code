import Item from "./item";

export default class OrderItem {

    constructor(readonly item: Item, readonly quantity: number) { }

    getAmount() {
        return this.item.price * this.quantity;
    }

}