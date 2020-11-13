import { Router } from "express";
import CouponController from "./controllers/coupon.controller"

import validate from "./middleware/validators/validate";

const router = Router();

router.get("/welcome", (req, res) => {
  return res.status(200).send({
    message: "welcome to the Dorotheos api",
  });
});

router.get("/", (req, res) => {
  return res.status(200).send({
    message: "welcome to Dorotheos api",
  });
});

/**
 * @api - POST /api/coupons
 * @description - This Endpoint Create a Coupon.
 * 
 */
router.post(
  "/api/coupons",
  validate.validateBody(validate.schemas.createCoupon),
  CouponController.createCoupon
);

/**
 * @api - GET /api/coupons
 * @description - This Endpoint Create a Coupon.
 * 
 */
router.get(
  "/api/coupons",
  validate.validateBody(validate.schemas.authLoginSchema),
  CouponController.getCoupons
);

/**
 * @api - POST /api/coupon/validate
 * @description - This Endpoint Create a Coupon.
 * 
 */
router.post(
  "/api/coupon/validate",
  validate.validateBody(validate.schemas.authLoginSchema),
  CouponController.validateCoupons
);



export default router;
