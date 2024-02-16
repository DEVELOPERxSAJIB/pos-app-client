import { Button, Form, Input, message } from "antd";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { useDispatch } from "react-redux";
import { HIDE_LOADING, SHOW_LOADING } from "../../redux/products/actionTypes";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = useForm();

  const onFinish = async (value) => {
    try {
      dispatch({ type: SHOW_LOADING });
      await axios
        .post(`${baseURL}/user/create-user`, value, {
          withCredentials: true,
        })
        .then((res) => {
          dispatch({ type: HIDE_LOADING });
          message.success(res.data.message);
          if (localStorage.getItem("user")) {
            navigate("/home");
          }
          form.resetFields();
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("pos-user")) {
      navigate("/home");
    }
  });

  return (
    <div className="main-wrapper">
      <div className="wrapper">
        <h2 className="mb-3">Registration</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item className="input-box" name={"name"} label="Name">
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item className="input-box" name={"email"} label="Email">
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item className="input-box" name={"password"} label="Password">
            <Input type="password" placeholder="Create password" />
          </Form.Item>
          <Form.Item
            className="input-box"
            name={"confirmPassword"}
            label="Confirm Password"
          >
            <Input type="password" placeholder="Confirm password" />
          </Form.Item>
          <div className="d-flex">
            <Button htmlType="submit" className="w-100 mb-3" type="primary">
              Register Now
            </Button>
          </div>
          <div className="text">
            <h3>
              Already have an account? <Link to="/login">Login now</Link>
            </h3>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
