export default interface InventoryRepository {

    setItemStock(itemId: string, quantity: number): Promise<boolean>;

    increaseItemStock(itemId: string, quantity: number): Promise<boolean>;

    decreaseItemStock(itemId: string, quantity: number): Promise<boolean>;
}