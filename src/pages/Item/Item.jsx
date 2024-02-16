import "./Cart.css";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { useDispatch } from "react-redux";
import {
  CREATE_PRODUCT_SUCCESS,
  DELETE_ITEM_SUCCESS,
  HIDE_LOADING,
  SHOW_LOADING,
} from "../../redux/products/actionTypes";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import alertify from "alertifyjs";

const Item = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState();
  const [editAddModal, setEditAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // get all item from db
  const getAllProduct = async () => {
    dispatch({ type: SHOW_LOADING });
    await axios
      .get(`${baseURL}/product/get-all-product`, {
        withCredentials: true,
      })
      .then((res) => {
        setProduct(res.data.product);
        dispatch({ type: HIDE_LOADING });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // load all item when item page load
  useEffect(() => {
    getAllProduct();
  }, []);

  // Add a new Item
  const onFinish = (value) => {
    try {
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: value });

      if (editingItem === null) {
        axios
          .post(`${baseURL}/product/create-product`, value)
          .then((res) => {
            alertify.success(res.data.message);
            setEditAddModal(false);
            getAllProduct();
          })
          .catch((err) => {
            dispatch({ type: HIDE_LOADING }),
              alertify.error(err.response.data.message);
          });
      } else {
        axios
          .patch(`${baseURL}/product/edit-product/${editingItem._id}`, value)
          .then((res) => {
            alertify.success(res.data.message);
            setEditAddModal(false);
            getAllProduct();
          })
          .catch((err) => {
            dispatch({ type: HIDE_LOADING }),
              alertify.error(err.response.data.message);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete item from db
  const handleDeleteItem = (id) => {
    try {
      dispatch({ type: DELETE_ITEM_SUCCESS });
      alertify.confirm(
        "Are You Sure?",
        "It will delete this item from your cart",
        function () {
          axios
            .delete(`${baseURL}/product/delete-product/${id}`)
            .then((res) => {
              alertify.success(res.data.message);
              getAllProduct();
            })
            .catch((err) => console.log(err.message));
        },
        function () {
          alertify.error("Cancel");
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Photo",
      dataIndex: "image",
      render: (id, record) => (
        <img src={record.image} alt="" height={50} width={80} />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Action",
      render: (_id, record) => (
        <div className="d-flex gap-3" style={{ cursor: "pointer" }}>
          <EditOutlined
            onClick={() => {
              setEditAddModal(true);
              setEditingItem(record);
            }}
          />
          <DeleteOutlined onClick={() => handleDeleteItem(record._id)} />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>All Item</h3>
        <Button className="add-item-btn" onClick={() => setEditAddModal(true)} type="primary">
          Add New Item
        </Button>
      </div>
      <Table columns={columns} dataSource={product} bordered />

      {editAddModal && (
        <Modal
          title={editingItem !== null ? "Edit Product" : "Add New Product"}
          open={editAddModal}
          onCancel={() => {
            setEditingItem(null);
            setEditAddModal(false);
          }}
          footer={false}
          centered
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item label="Name" name={"name"}>
              <Input />
            </Form.Item>
            <Form.Item label="Price" name={"price"}>
              <Input />
            </Form.Item>
            <Form.Item label="Image URL" name={"image"}>
              <Input />
            </Form.Item>
            <Form.Item label="Category" name={"category"}>
              <Select placeholder="Select a Category">
                <Select.Option value="fruits">Fruits</Select.Option>
                <Select.Option value="vegetable">Vegetable</Select.Option>
                <Select.Option value="meat">Meat</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button htmlType={"submit"} className="create-button">
                Create Now
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Item;
