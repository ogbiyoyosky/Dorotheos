import mongoose, { Schema, Document, model, Model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface ICoupon extends Document {
  code: String;
  description: String,
  discount: Number,
  type: String,
  constraints: {
    startDate: Date,
    endDate: Date,
    minimum: Number,
    maximum: Number
  },
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
}

export let CouponSchema: Schema<ICoupon> = new Schema({
  code: {
    type: String,
    required: "Code is Required",
    unique: true,
  },
  type: {
    type: String,
    enum : ['percent','flat'],
    default: 'flat'
  },
  description: {
    type: String,
    required: "Description is required",
  },
  discount: {
    type: Number,
    required: "Discount Amount is Required",
  },


  constraints: {
    startDate: {
      type: Date,
      required: "Start Date is Required",
    },
    endDate: {
      type: Date,
      required: "Start Date is Required",
    },
    minimum: {
      type: Number,
      required: "Minimum Amount is Required",
    },
    maximum: {
      type: Number,
    },
    type: Object
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  modifiedAt: {
    type: Date,
    default: new Date(),
  },

  deletedAt: {
    type: Date,
    default: null,
  },
});

CouponSchema.plugin(uniqueValidator);



interface CouponSchemaDoc extends ICoupon, Document {}

const CouponModel: Model<CouponSchemaDoc> = model<CouponSchemaDoc>(
  "Coupon",
  CouponSchema
);

export default CouponModel;
