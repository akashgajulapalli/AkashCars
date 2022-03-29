import React, {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());

  });

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        <li style={{ color: "orangered" }}>Logout</li>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1 style={{ color: "orangered" }}>
                <b><Link to="/admin">AKASH CAR RENTALS</Link></b>
              </h1>

              <Dropdown overlay={menu} placement="bottomCenter">
                <Button>{user.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <Row justify="center" gutter={16} className="mt-3">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <a href="/addcar">ADD CAR</a>
            </button>
          </div>
        </Col>
      </Row>
      <div className="home_main">
        <Row justify="center" gutter={16} className="mt-5">
          {cars.length > 0
            ? cars.map((car, index) => {
                return (
                  <Col lg={6} sm={24} xs={24} key={index}>
                    <div className=" car p-2 bs1 mt-2">
                      <img src={car.image} alt="" className="carimg" />
                      <div className=" d-flex align-items-center justify-content-between">
                        <div>
                          <p>{car.name}</p>
                          <p>Rs.{car.rentPerHour} Rent Per Hour</p>
                        </div>
                        <div className="mr-4">
                          <Link to={`/editcar/${car._id}`}>
                            <EditOutlined
                              className="mr-3"
                              style={{ color: "green", cursor: "pointer" }}
                            />
                          </Link>

                          <Popconfirm
                            title="Are you sure to delete this car?"
                            onConfirm={() => {
                              dispatch(deleteCar({ carid: car._id }));
                            }}
                            okText="Yes"
                            cancelText="No"
                          >
                            <DeleteOutlined
                              style={{ color: "red", cursor: "pointer" }}
                            />
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })
            : null}
        </Row>
      </div>
    </div>
  );
}

export default AdminHome;
