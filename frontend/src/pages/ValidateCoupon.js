import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import products from "../data/products";

const ValidateCoupon = () => {
  const [couponDetail, setCouponDetail] = useState({
    couponCode: "",
    amount: "",
  });

  const [showCoupon, setShowCoupon] = useState(true);

  const [discount, setDiscount] = useState(0);

  const amount = products.reduce((acc, current) => {
    return Number(acc) + Number(current.amount);
  }, 0);

  useEffect(() => {}, []);

  const handleChange = ({ target: { value, name } }) => {
    const amount = products.reduce((acc, current) => {
      return Number(acc) + Number(current.amount);
    }, 0);
    setCouponDetail({ ...couponDetail, [name]: value, amount });
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/coupon/validate",
        couponDetail
      );

      setCouponDetail({
        couponCode: "",
        amount: "",
      });

      toast.success(result.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDiscount(result.data.results.discount_to_remove);
      setShowCoupon(false);
      // return result;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container">
      <h2>Cart Items</h2>
      <div className="row mt-5">
        {products.length
          ? products.map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src={item.img}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">#{item.amount}</h5>
                    <p className="card-text">{item.Description}</p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      <div className="row mt-5">
        <h2>Amount</h2>
        <h2>: {amount}</h2>
      </div>
      <div className="row">
        <h2>Discount</h2>
        <h2>: {discount}</h2>
      </div>
      <div className="row">
        <h2>Total Amount </h2>
        <h2>: {amount - discount}</h2>
      </div>
      {showCoupon ? (
        <>
          <div className="form-group">
            <label htmlFor="simpleinput">Enter Coupon Code</label>
            <input
              type="text"
              onChange={handleChange}
              id="simpleinput"
              className="form-control"
              name="couponCode"
              value={couponDetail.couponCode}
            />
          </div>
          <div className="form-group">
            <button
              onClick={handleSubmit}
              className="btn btn-success btn-block"
            >
              Sumbit
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ValidateCoupon;
