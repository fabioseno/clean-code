import Item from "../../src/domain/entity/item";

describe('item', () => {
    test('should get volume', () => {
        const item = new Item('id', 'name', 100, 100, 100, 100, 100);
        expect(item.getVolume()).toBe(1);
    });

    test('should get density', () => {
        const item = new Item('id', 'name', 100, 100, 100, 100, 100);
        expect(item.getVolume()).toBe(1);
    });

    test('should not allow negative height', () => {
        expect(() => {
            new Item('id', 'name', 100, -100, 100, 100, 100)
        }).toThrow('Invalid height');
    });

    test('should not allow negative width', () => {
        expect(() => {
            new Item('id', 'name', 100, 100, -100, 100, 100)
        }).toThrow('Invalid width');
    });

    test('should not allow negative depth', () => {
        expect(() => {
            new Item('id', 'name', 100, 100, 100, -100, 100)
        }).toThrow('Invalid depth');
    });

    test('should not allow negative weight', () => {
        expect(() => {
            new Item('id', 'name', 100, 100, 100, 100, -100)
        }).toThrow('Invalid weight');
    });
});