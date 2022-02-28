export default class Coupom {
    constructor(readonly code: string, readonly discountPercentage: number, readonly expirationDate?: Date) { }

    isExpired() {
        if (!this.expirationDate) return false;
        return (this.expirationDate < new Date());
    }
}