export default class Inventory {

    constructor (readonly itemId: string, private quantity: number) {
        if (quantity < 0) throw new Error('Stock must be positive');
    }

    getStock() {
        return this.quantity;
    }

    increaseStock(amount: number) {
        this.quantity += amount;
    }

    decreaseStock(amount: number) {
        if (amount > this.quantity) throw new Error('Stock must be positive');
        this.quantity -= amount;
    }
}