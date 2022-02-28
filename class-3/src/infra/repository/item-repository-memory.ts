import Item from "../../domain/entity/item";
import ItemRepository from "../../domain/repository/item-repository";

export default class ItemRepositoryMemory implements ItemRepository {

    private items: Item[] = [];

    constructor() {
        this.items = [
            new Item('1', 'Camera', 30, 20, 10, 10, 1),
            new Item('2', 'Guitarra', 20, 20, 100, 30, 3),
            new Item('3', 'Geladeira', 40, 40, 200, 10, 40),
        ]
    }

    getById(id: string): Item | undefined {
        return this.items.find(item => item.id === id);
    }

}