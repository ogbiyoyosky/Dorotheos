import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Coupon = () => {
  const [coupons, setCoupon] = useState([]);
  const [couponDetail, setCouponDetail] = useState({
    code: "",
    description: "",
    type: "",
    startDate: "",
    endDate: "",
    discount: "",
    minimum: "",
    maximum: "",
  });
  useEffect(() => {
    try {
      getAllCoupons();
    } catch (error) {}
  }, []);

  const handleSubmit = async () => {
    try {
      if (couponDetail.type === "flat") {
        delete couponDetail.maximum;
      }
      console.log(couponDetail, "coupon");
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/coupons`,
        couponDetail
      );
      await getAllCoupons();
      setCouponDetail({
        code: "",
        description: "",
        type: "",
        startDate: "",
        endDate: "",
        discount: "",
        minimum: "",
        maximum: "",
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
      // console.log(result, "result");
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

  const getAllCoupons = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/coupons`)
      .then((res) => {
        return res.json();
      })
      .then(({ results }) => {
        setCoupon(results.coupons);
      });
  };

  const handleChange = ({ target: { value, name } }) => {
    setCouponDetail({ ...couponDetail, [name]: value });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="nav">
          <div className="navbar">
            <Link className="navbar-link" to="/validate-coupon">
              Validate Coupon
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <table className="table table-centered mb-0">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length
                ? coupons.map((item, index) => (
                    <tr key={index}>
                      <td>{item.code}</td>
                      <td>
                        {item.discount}{" "}
                        {item.type === "percent" ? "%" : "Rupees"}
                      </td>
                      <td>
                        {new Date(item.constraints.startDate).toDateString()}
                      </td>
                      <td>
                        {new Date(item.constraints.endDate).toDateString()}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <div className="card ">
            <div className="card-header">
              <h2>Create A Coupon</h2>
            </div>
            <div className="card-body text-left">
              <div className="form-group">
                <label htmlFor="simpleinput">Coupon</label>
                <input
                  type="text"
                  value={couponDetail.code}
                  id="simpleinput"
                  onChange={handleChange}
                  className="form-control"
                  name="code"
                />
              </div>
              <div className="form-group">
                <label htmlFor="example-email">Type</label>
                <select
                  className="form-control"
                  name="type"
                  onChange={handleChange}
                  value={couponDetail.type}
                >
                  <option value="">Choose Type</option>
                  <option value="flat">Flat</option>
                  <option value="percent">Percent</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="simpleinput">Start Date</label>
                <input
                  type="datetime-local"
                  id="simpleinput"
                  name="startDate"
                  value={couponDetail.startDate}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="simpleinput">End Date</label>
                <input
                  type="datetime-local"
                  onChange={handleChange}
                  value={couponDetail.endDate}
                  id="simpleinput"
                  className="form-control"
                  name="endDate"
                />
              </div>
              <div className="form-group">
                <label htmlFor="simpleinput">Discount</label>
                <input
                  type="number"
                  id="simpleinput"
                  onChange={handleChange}
                  value={couponDetail.discount}
                  className="form-control"
                  name="discount"
                />
              </div>
              <div className="form-group">
                <label htmlFor="simpleinput">Minimum</label>
                <input
                  type="number"
                  id="simpleinput"
                  value={couponDetail.minimum}
                  className="form-control"
                  onChange={handleChange}
                  name="minimum"
                />
              </div>
              {couponDetail.type === "percent" ? (
                <div className="form-group">
                  <label htmlFor="simpleinput">Maximum</label>
                  <input
                    type="number"
                    id="simpleinput"
                    className="form-control"
                    name="maximum"
                    onChange={handleChange}
                    value={couponDetail.maximum}
                  />
                </div>
              ) : null}
              <div className="form-group">
                <label htmlFor="simpleinput">Description</label>
                <textarea
                  type="number"
                  id="simpleinput"
                  className="form-control"
                  name="description"
                  value={couponDetail.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <button
                  onClick={handleSubmit}
                  className="btn btn-success btn-block"
                >
                  Create Coupon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
