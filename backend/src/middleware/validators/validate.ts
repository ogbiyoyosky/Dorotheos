import Joi from "@hapi/joi";
import logger from "../../logger";



const validator = {
  validateBody: (schema) => (req, res, next) => {
    //logger.info("body", req.body);
    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).send({
        status: "bad request",
        status_code: 400,
        error: result.error.message,
      });
    }

    req.body = result.value;
    return next();
  },

  schemas: {
    createCoupon: Joi.object().keys({
      code: Joi.string()
        .required()
        .trim()
        .error(new Error("CouponCode is Required")),
      description: Joi.string()
        .required()
        .trim()
        .lowercase()
        .error(new Error("Description is required")),
      type: Joi.string().valid('flat', 'percent')
      .required()
      .trim()
      .error(new Error("flat or percent are the only valid values for type")),
      
      startDate: Joi.date()
        .required()
        .error(new Error("StartDate is required")),
      endDate: Joi.date()
        .required()
        .error(new Error("EndDate is required")),
      minimum: Joi.number()
      .required()
      .error(new Error("Minimum is required")),
      maximum: Joi.number()
      .error(new Error("Maximum must be an Integer")),
      discount: Joi.number()
      .required()
      .error(new Error("Discount is required")),
    }),

    validateCoupon: Joi.object().keys({
      couponCode: Joi.string()
        .required()
        .trim()
        .error(new Error("Code is Required")),
      
      amount: Joi.number()
      .required()
      .error(new Error("Amount is required")),
    })
  
  },

  


};

export default validator;
