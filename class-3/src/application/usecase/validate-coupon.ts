import CouponRepository from "../../domain/repository/coupon-repository";

export default class ValidateCoupon {

    constructor(readonly couponRepository: CouponRepository) {}

    execute(code: string, issueDate: Date): boolean {
        const coupon = this.couponRepository.getByCode(code);
        if (!coupon) return false;
        return !coupon.isExpired(issueDate);
    }
}