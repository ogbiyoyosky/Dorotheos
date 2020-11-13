import { Request, Response, NextFunction } from "express";
import CouponModel, { ICoupon } from "../models/Coupon";
import logger from "../logger";
import * as httpStatus from "http-status";
import { any } from "joi";




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
      const { code, description,type, startDate, endDate,discount, minimum , maximum} = req.body;
      //run validations
     
      if(type == "percent") {
        if(!maximum) {
          return res.status(httpStatus.BAD_REQUEST).send({
            message: "Maximum Amount to be deducted required for type of percent",
            status: "Bad Request",
            status_code: httpStatus.BAD_REQUEST,
          });
        }
      }

      const initialDate = new Date(startDate).getTime() 
      const expiringDate = new Date(endDate).getTime() 
      const now = new Date().getTime()

      if(initialDate < now) {
        return res.status(httpStatus.BAD_REQUEST).send({
          message: "startDate can not be less than current date",
          status: "Bad Request",
          status_code: httpStatus.BAD_REQUEST,
        });
      }

      if(expiringDate < initialDate) {
        return res.status(httpStatus.BAD_REQUEST).send({
          message: "startDate can not be greater than endDate",
          status: "Bad Request",
          status_code: httpStatus.BAD_REQUEST,
        });
      }

      CouponModel.create<any>({
        code,
        description,
        type,
        discount,
        constraints: {
          startDate,
          endDate,
          minimum,
          maximum: maximum ? maximum : null
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
      const {couponCode, amount} = req.body;

      if(amount < 0) {
        return res.status(httpStatus.BAD_REQUEST).send({
          message: "Amount must be greater than zero",
          status: "bad request",
          status_code: httpStatus.BAD_REQUEST,
        });
      }

      
      CouponModel.findOne({ code: couponCode })
        .then((coupon) => {
          if (!coupon)
            return res.status(httpStatus.BAD_REQUEST).send({
              message: "Coupon not found",
              status: "bad request",
              status_code: httpStatus.BAD_REQUEST,
            });

            //validate
            const {type, discount, constraints: {startDate, endDate, minimum, maximum}}: ICoupon = coupon

            const initialDate = new Date(startDate).getTime() 
            const expiringDate = new Date(endDate).getTime()
            const now = new Date().getTime()

            let amountToBePaid: number;
            if(type == "percent") {


              if(amount < minimum) {
                return res.status(httpStatus.BAD_REQUEST).send({
                  message: "Coupon can't apply, amount not upto minimum amount allowed for coupon",
                  status: "bad request",
                  status_code: httpStatus.BAD_REQUEST,
                });
              }

              if(now > expiringDate) return res.status(httpStatus.BAD_REQUEST).send({
                message: "Coupon can't apply, coupon has expired",
                status: "bad request",
                status_code: httpStatus.BAD_REQUEST,
              });

             
             const amountToBeDiscounted: number  = <number>amount * (<number>discount / 100)

             amountToBePaid = amountToBeDiscounted > maximum ? (<number>amount - <number>maximum) : <number>amount - <number>amountToBeDiscounted
             console.log({discount: amount- amountToBePaid})

            } else {
              

              if(now > expiringDate) return res.status(httpStatus.BAD_REQUEST).send({
                message: "Coupon can't apply, coupon has expired",
                status: "bad request",
                status_code: httpStatus.BAD_REQUEST,
              });

               const amountRemainingAfterDiscount: number  = <number>amount - <number>discount

               amountToBePaid = amountRemainingAfterDiscount < 0 ? 0 : amountRemainingAfterDiscount

            }

            

          
          return res.status(httpStatus.OK).send({
            message: "Successfully  validated coupon",
            status: "ok",
            status_code: httpStatus.OK,
            results: {
              discount_to_remove: amount - amountToBePaid 
            },
          });
        })
     
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
