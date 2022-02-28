export default class Coupom {
    constructor(readonly code: string, readonly discountPercentage: number, readonly expirationDate?: Date) { }

    isExpired(issueDate: Date = new Date()) {
        if (!this.expirationDate) return false;
        return (this.expirationDate < issueDate);
    }
}