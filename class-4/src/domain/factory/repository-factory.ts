import CouponRepository from "../repository/coupon-repository";
import InventoryRepository from "../repository/inventory-repository";
import ItemRepository from "../repository/item-repository";
import OrderRepository from "../repository/order-repository";

export default interface RepositoryFactory {
    createCouponRepository(): CouponRepository;
    createItemRepository(): ItemRepository;
    createInventoryRepository(): InventoryRepository;
    createOrderRepository(): OrderRepository;
}