import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { HIDE_LOADING, SHOW_LOADING } from "../../redux/products/actionTypes";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = useForm();

  const onFinish = async (value) => {
    try {
      dispatch({ type: SHOW_LOADING });
      await axios
        .post(`${baseURL}/user/user-login`, value, {
          withCredentials: true,
        })
        .then((res) => {
          dispatch({ type: HIDE_LOADING });
          message.success(res.data.message);
          localStorage.setItem("pos-user", JSON.stringify(res.data.payload));
          form.resetFields();
          navigate('/home')
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("pos-user")) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="login-wrapper">
      <div className="wrapper">
        <h2>Login</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name={"email"} label="Email" className="input-box">
            <Input placeholder="username or email" />
          </Form.Item>
          <Form.Item name={"password"} label="Password" className="input-box">
            <Input type="password" placeholder="password" />
          </Form.Item>
          <Form.Item className="input-box button">
            <div className="d-flex w-100">
              <Button htmlType="Submit" type="primary" className="w-100">
                Login Now
              </Button>
            </div>
          </Form.Item>
          <div className="text">
            <h3>
              Create an account? &nbsp;
              <Link to="/register">Register now</Link>
            </h3>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
