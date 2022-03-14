export default class CalulateShippingCostInput {
    constructor(readonly cpf: string, readonly items: { itemId: string, quantity: number }[]) { }
}