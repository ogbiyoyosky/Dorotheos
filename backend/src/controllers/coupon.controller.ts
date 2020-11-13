import { Request, Response, NextFunction } from "express";
import CouponModel, { ICoupon } from "../models/Coupon";
import * as httpStatus from "http-status";


interface ICouponArgs {
  email: string;
  password: string;
}

class CouponController {
  /**
   * Create a Coupon
   * @param {Object} req: url params
   * @param {Function} res: Express.js response callback
   * @param {Function} next: Express.js middleware callback
   * @author Emmanuel Ogbiyoyo
   * @public
   */

  public static async createCoupon(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      
    } catch (error) {
      
    }
  }

  /**
   * Validate a Coupon
   * @param {Object} req: url params
   * @param {Function} res: Express.js response callback
   * @param {Function} next: Express.js middleware callback
   * @author Emmanuel Ogbiyoyo
   * @public
   */

  public static async validateCoupons(req: Request, res: Response, next: NextFunction) {
    try {
     
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal Server Error",
        status: "Internal Server Error",
        status_code: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /**
   * Fetch all coupons
   * @param {Object} req: url params
   * @param {Function} res: Express.js response callback
   * @param {Function} next: Express.js middleware callback
   * @author Emmanuel Ogbiyoyo
   * @public
   */

  public static getCoupons(req: Request, res: Response, next: NextFunction) {
    try {
     
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal Server Error",
        status: "Internal Server Error",
        status_code: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
export default CouponController;
