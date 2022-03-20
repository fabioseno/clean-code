import RepositoryFactory from "../../../domain/factory/repository-factory";
import CouponRepository from "../../../domain/repository/coupon-repository";

export default class ValidateCoupon {

    couponRepository: CouponRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.couponRepository = repositoryFactory.createCouponRepository();
    }

    execute(code: string, issueDate: Date): boolean {
        const coupon = this.couponRepository.getByCode(code);
        if (!coupon) return false;
        return !coupon.isExpired(issueDate);
    }
}