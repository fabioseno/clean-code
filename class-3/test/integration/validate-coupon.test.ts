import ValidateCoupon from '../../src/application/usecase/validate-coupon';
import CouponRepositoryMemory from '../../src/infra/repository/coupon-repository-memory';

test('should validate coupon', () => {
    const couponRepository = new CouponRepositoryMemory();
    const validateCoupon = new ValidateCoupon(couponRepository);
    expect(validateCoupon.execute('VALE30', new Date('2022-02-28'))).toBeFalsy();
});