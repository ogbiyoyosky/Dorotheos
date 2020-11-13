import { Request, Response, NextFunction } from "express";
import CouponModel, { ICoupon } from "../models/Coupon";
import logger from "../logger";
import * as httpStatus from "http-status";




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
      const { code, description, startDate, endDate,discount, minimum } = req.body;
      //run validations

      const initialData = new Date(startDate).getTime() 
      const expiringDate = new Date(endDate).getTime() 
      const now = new Date().getTime()

      if(initialData < now) {
        return res.status(httpStatus.BAD_REQUEST).send({
          message: "startDate can not be less than current date",
          status: "Bad Request",
          status_code: httpStatus.BAD_REQUEST,
        });
      }

      if(expiringDate < initialData) {
        return res.status(httpStatus.BAD_REQUEST).send({
          message: "startDate can not be greater than endDate",
          status: "Bad Request",
          status_code: httpStatus.BAD_REQUEST,
        });
      }

      CouponModel.create<any>({
        code,
        description,
        discount,
        constraints: {
          startDate,
          endDate,
          minimum
        }
      })
        .then((coupon) => {
          return res.status(httpStatus.CREATED).send({
            message: "Coupon successfully created",
            status: "created",
            status_code: httpStatus.CREATED,
            results: coupon,
          });
        })
        .catch((err) => {
        
            logger.info("Account already exist", err.message);
            return res.status(httpStatus.CONFLICT).send({
              message: "Coupon with that code already exist",
              status: "conflict",
              status_code: httpStatus.CONFLICT,
            });
      
        });
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

  public static async getCoupons(req: Request, res: Response, next: NextFunction) {
    try {
      let { page, perPage } = req.query as any;

      perPage = perPage ? parseInt(perPage, 10) : 10;
      page = page ? parseInt(page, 10) : 1;
      const teams = await CouponModel.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 })
        .exec();

      return res.status(httpStatus.OK).send({
        message: "Successfully  fetched all coupons",
        status: "ok",
        status_code: httpStatus.OK,
        results: {teams,
          meta: {
            page,
            perPage,
            total: teams.length
          }
        },
      });
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
