import "./Cart.css";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  deleteFromCart,
  quantityIncrease,
  qunatityDecrease,
} from "../../redux/products/action";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = useForm();

  const { cartItems } = useSelector((state) => state.product);

  const [subTotal, setSubTotal] = useState(0);
  const [chargeBill, setChargeBill] = useState(false);

  const handleIncrease = (data) => {
    dispatch(quantityIncrease(data));
  };

  const handleDecrease = (data) => {
    dispatch(qunatityDecrease(data));
  };

  useEffect(() => {
    let temp = 0;

    cartItems?.map((item) => {
      temp += item.price * item.quantity;
    });

    setSubTotal(temp);
  }, [cartItems]);

  const handleDelete = (id) => {
    const dltItem = JSON.parse(localStorage.getItem("cartItems"));
    const filteredData = dltItem.filter((data) => data._id !== id);
    localStorage.setItem("cartItems", JSON.stringify(filteredData));
    dispatch(deleteFromCart(id))
  };

  const coloums = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Photo",
      dataIndex: "image",
      render: (image) => <img src={image} alt="" height={50} width={70} />,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex align-items-center quantity-des">
          <PlusCircleOutlined
            onClick={() => handleIncrease(record)}
            className="cur-poi"
          />
          <span className="mx-2">{record.quantity}</span>
          <MinusCircleOutlined
            onClick={() => handleDecrease(record)}
            className="cur-poi"
          />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id) => <DeleteOutlined onClick={() => handleDelete(id)} />,
    },
  ];

  const tax = (subTotal * 10) / 100;

  const onFinish = (values) => {
    let object = {
      ...values,
      cartItems,
      subTotal,
      tax,
      grandTotal: subTotal + tax,
      userId: JSON.parse(localStorage.getItem("pos-user"))._id,
    };

    try {
      axios
        .post(`${baseURL}/bills/create-bill`, object)
        .then((res) => {
          message.success(res.data.message);
          form.resetFields();
          setChargeBill(false);
          localStorage.removeItem("cartItems");
          navigate("/bills");
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    } catch (error) {
      message.error(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <DefaultLayout>
        <Table columns={coloums} dataSource={cartItems} bordered />

        <hr />
        <div className="d-flex justify-content-end container-xxl mt-3">
          <div className="subtotal d-flex align-items-center gap-3">
            <h5 style={{ margin: 0 }}>
              Total Ammount = <b>{subTotal} $</b>
            </h5>
            <Button
              className="charge-bill-btn"
              onClick={() => setChargeBill(true)}
              type="primary"
            >
              Charge Bill
            </Button>
          </div>
        </div>
      </DefaultLayout>

      <Modal
        title="Charge Bill"
        open={chargeBill}
        onCancel={() => setChargeBill(false)}
        footer={false}
        centered
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Customer Name" name={"customerName"}>
            <Input />
          </Form.Item>
          <Form.Item initialValue={subTotal + tax} label="Price" name={"price"}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" name={"phone"}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name={"paymentMethod"}>
            <Select placeholder="Select a Method">
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="Card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-info">
            <div className="d-flex flex-column">
              <h5 className="text-right">Sub Total : {subTotal} $</h5>
              <h5>Tax : {tax} $ </h5>
              <hr />
              <h4>Grand Total : {tax + subTotal} $</h4>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button htmlType={"submit"} className="create-button w-100">
              CHARGE BILL
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Cart;
