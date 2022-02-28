import Coupom from "../../domain/entity/coupom";
import CouponRepository from "../../domain/repository/coupon-repository";

export default class CouponRepositoryMemory implements CouponRepository {

    private coupons: Coupom[] = [];

    constructor() {
        this.coupons = [
            new Coupom('VALE20', 20, new Date('2024-02-28')),
            new Coupom('VALE30', 30, new Date('2020-01-01'))
        ]
    }

    getByCode(code: string): Coupom | undefined {
        return this.coupons.find(item => item.code === code);
    }

}