import RepositoryFactory from "../../domain/factory/repository-factory";
import couponRepository from "../../domain/repository/coupon-repository";
import inventoryRepository from "../../domain/repository/inventory-repository";
import itemRepository from "../../domain/repository/item-repository";
import orderRepository from "../../domain/repository/order-repository";
import CouponRepositoryMemory from "../repository/coupon-repository-memory";
import InventoryRepositoryMemory from "../repository/inventory-repository-memory";
import ItemRepositoryMemory from "../repository/item-repository-memory";
import OrderRepositoryMemory from "../repository/order-repository-memory";

export default class MemoryRepositoryFactory implements RepositoryFactory {

    private couponRepositoryMemory: CouponRepositoryMemory;
    private itemRepositoryMemory: ItemRepositoryMemory;
    private inventoryRepositoryMemory: InventoryRepositoryMemory;
    private orderRepositoryMemory: OrderRepositoryMemory;

    constructor() {
        this.couponRepositoryMemory = new CouponRepositoryMemory();
        this.itemRepositoryMemory = new ItemRepositoryMemory();
        this.inventoryRepositoryMemory = new InventoryRepositoryMemory();
        this.orderRepositoryMemory = new OrderRepositoryMemory();
    }
    createCouponRepository(): couponRepository {
        return this.couponRepositoryMemory;
    }

    createItemRepository(): itemRepository {
        return this.itemRepositoryMemory;
    }

    createInventoryRepository(): inventoryRepository {
        return this.inventoryRepositoryMemory;
    }

    createOrderRepository(): orderRepository {
        return this.orderRepositoryMemory;
    }

}