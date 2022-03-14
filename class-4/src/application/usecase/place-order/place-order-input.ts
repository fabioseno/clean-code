export default class PlaceOrderInput {

    constructor(readonly cpf: string, readonly items: { itemId: string, quantity: number }[], readonly coupon?: string, readonly issueDate: Date = new Date()) {

    }
}