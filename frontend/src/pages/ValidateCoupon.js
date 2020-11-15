import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const products = [
  {
    Id: "jenlooper-cactus",
    Maker: "@jenlooper",
    amount: 100,
    img:
      "https://user-images.githubusercontent.com/41929050/61567048-13938600-aa33-11e9-9cfd-712191013192.jpeg",
    Url:
      "https://www.hackster.io/agent-hawking-1/the-quantified-cactus-an-easy-plant-soil-moisture-sensor-e65393",
    Title: "The Quantified Cactus: An Easy Plant Soil Moisture Sensor",
    Description:
      "This project is a good learning project to get comfortable with soldering and programming an Arduino.",
    Ratings: [5, 5],
  },
  {
    Id: "sailorhg-corsage",
    Maker: "sailorhg",
    amount: 300,
    img:
      "https://user-images.githubusercontent.com/41929050/61567055-142c1c80-aa33-11e9-96ff-9fbac6413625.png",
    Url: "https://twitter.com/sailorhg/status/1090113666911891456",
    Title: "Light-up Corsage",
    Description: "Light-up corsage I made with my summer intern.",
    Ratings: null,
  },
  {
    Id: "jenlooper-lightshow",
    amount: 150,
    Maker: "@jenlooper",
    img:
      "https://user-images.githubusercontent.com/41929050/61567053-13938600-aa33-11e9-9780-104fe4019659.png",
    Url:
      "https://www.hackster.io/agent-hawking-1/bling-your-laptop-with-an-internet-connected-light-show-30e4db",
    Title: "Bling your Laptop with an Internet-Connected Light Show",
    Description:
      "Create a web-connected light-strip API controllable from your website, using the Particle.io.",
    Ratings: null,
  },
];

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
        `${process.env.REACT_APP_BASE_URL}/api/coupon/validate`,
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
                  <img className="card-img-top" src={item.img} alt={item.id} />
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
