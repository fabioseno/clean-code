import OrderItem from "./order-item";

export default class Freight {

    private MINIMUM_SHIPPING_COST = 10;
    private DISTANCE = 100;
    private totalFreight: number = 0;

    addItem(orderItem: OrderItem) {
        const volume = orderItem.item.getVolume();
        const density = orderItem.item.getDensity();

        this.totalFreight += orderItem.quantity * this.DISTANCE * volume * density / 100;
    }

    getTotal() {
        return Math.max(this.totalFreight, this.MINIMUM_SHIPPING_COST);
    }
}