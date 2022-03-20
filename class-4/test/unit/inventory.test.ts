import Inventory from "../../src/domain/entity/inventory";

describe('inventory', () => {
    test('should increase stock', () => {
        const inventory = new Inventory('1', 1);
        inventory.increaseStock(2);
        expect(inventory.getStock()).toBe(3);
    });

    test('should decrease stock', () => {
        const inventory = new Inventory('1', 1);
        inventory.decreaseStock(1);
        expect(inventory.getStock()).toBe(0);
    });

    test('should not allow negative stock', () => {
        const inventory = new Inventory('1', 1);
        expect(() => inventory.decreaseStock(2)).toThrow(new Error('Stock must be positive'));
    });
});