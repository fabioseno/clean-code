import Inventory from "../../domain/entity/inventory";
import InventoryRepository from "../../domain/repository/inventory-repository";

export default class InventoryRepositoryMemory implements InventoryRepository {

    private inventory: Inventory[];

    constructor() {
        this.inventory = [
            new Inventory('1', 10),
            new Inventory('2', 30),
            new Inventory('3', 40)
        ]
    }
    async getItemStock(itemId: string): Promise<Inventory | undefined> {
        const item = this.inventory.find(inventoryItem => inventoryItem.itemId === itemId);

        if (!item) throw new Error('Item not found');
        return item;
    }

    async setItemStock(itemId: string, quantity: number): Promise<boolean> {
        const itemIndex = await this.inventory.findIndex(inventoryItem => inventoryItem.itemId === itemId);

        if (itemIndex >= 0) {
            this.inventory.splice(itemIndex, 1);
        }
        this.inventory.push(new Inventory(itemId, quantity));
        return false;
    }
    async increaseItemStock(itemId: string, quantity: number): Promise<boolean> {
        const item = await this.getItemStock(itemId);

        if (item) {
            item.increaseStock(quantity);
            return true;
        }
        return false;
    }
    async decreaseItemStock(itemId: string, quantity: number): Promise<boolean> {
        const item = await this.getItemStock(itemId);

        if (item) {
            item.decreaseStock(quantity);
            return true;
        }
        return false;
    }

}