import React, {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  });




  return (
    <DefaultLayout>
      <div className="home_main">
      <Row justify="center" gutter={16} className="mt-5">
        {cars.length > 0
          ? cars.map((car, index) => {
              return (
                <Col lg={6} sm={24} xs={24} key={index} >
                  <div className=" car p-2 bs1 mt-2">
                    <img src={car.image} alt="" className="carimg" />
                    <div className=" d-flex align-items-center justify-content-between">
                      <div>
                        <p>{car.name}</p>
                        <p>Rs.{car.rentPerHour} Rent Per Hour</p>
                      </div>
                      <div>
                        <button className="btn1 mr-2">
                          <Link to={`/booking/${car._id}`}>Book Now</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })
          : null}
      </Row>
      </div>


    </DefaultLayout>
  );
}

export default Home;
