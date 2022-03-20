import ValidateCoupon from '../../src/application/usecase/validate-coupon/validate-coupon';
import MemoryRepositoryFactory from '../../src/infra/factory/memory-repository-factory';

test('should validate coupon', () => {
    const memoryRepositoryFactory = new MemoryRepositoryFactory()
    const validateCoupon = new ValidateCoupon(memoryRepositoryFactory);
    expect(validateCoupon.execute('VALE30', new Date('2022-02-28'))).toBeFalsy();
});