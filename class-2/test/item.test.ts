import Item from "../src/item";

describe('item', () => {
    test('should get volume', () => {
        const item = new Item('id', 'name', 100, 100, 100, 100, 100);
        expect(item.getVolume()).toBe(1);
    });

    test('should get density', () => {
        const item = new Item('id', 'name', 100, 100, 100, 100, 100);
        expect(item.getVolume()).toBe(1);
    });
});