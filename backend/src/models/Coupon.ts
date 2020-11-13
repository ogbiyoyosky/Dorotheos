import mongoose, { Schema, Document, model, Model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface ICoupon extends Document {
  code: String;
  description: String,
  discount: Number,
  constraints: {
    startDate: Date,
    endDate: Date,
    mininum: Number
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
  description: {
    type: String,
    required: "Description is required",
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
    mininum: {
      type: Number,
      required: "Start Date is Required",
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
