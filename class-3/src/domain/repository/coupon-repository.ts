import Coupom from "../entity/coupom";

export default interface CouponRepository {

   getByCode(code: string): Coupom | undefined;
}