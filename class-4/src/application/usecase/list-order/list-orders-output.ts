export default class FindOrderOutput {

    constructor(readonly cpf: string, readonly orderDate: Date, readonly total: number, readonly code: string) {

    }
}