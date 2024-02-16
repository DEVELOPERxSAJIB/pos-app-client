import "./Bill.css";
import { Button, Modal, Table } from "antd";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { EyeOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";

const Bill = () => {
  const [bills, setBills] = useState();
  const [billPrintModal, setBillPrintModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState();

  const purchesDate = selectedBill?.createdAt.toString().substring(0, 10);

  const columns = [
    {
      title: "Bill Id",
      dataIndex: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Customer Number",
      dataIndex: "phone",
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Total",
      dataIndex: "grandTotal",
    },
    {
      title: "Action",
      render: (_id) => (
        <div className="" style={{ cursor: "pointer" }}>
          <EyeOutlined
            onClick={() => {
              setSelectedBill(_id), setBillPrintModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const billColumn = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      render: (record) => record.quantity * record.price,
    },
  ];

  useEffect(() => {
    axios
      .get(`${baseURL}/bills/all-bills`)
      .then((res) => {
        const data = res.data.payload;
        data.reverse();
        setBills(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Bills Statement</h3>
      </div>
      <Table columns={columns} dataSource={bills} bordered />

      <Modal
        footer={false}
        title=""
        centered
        onCancel={() => setBillPrintModal(false)}
        open={billPrintModal}
        width={800}
      >
        <div ref={componentRef} className="print-area mt-4 p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="shop-name">
              <h4>
                <b>Brand Shop</b>
              </h4>
            </div>
            <div className="shop-address">
              <p>Khulna - 9100</p>
              <p>23 city road, KDA</p>
              <p>01789557538</p>
            </div>
          </div>
          <div className="border-dashed my-3"></div>
          <div className="bill-details mb-3">
            <p>
              <b>Name : </b>
              {selectedBill?.customerName}
            </p>
            <p>
              <b>Phone : </b>
              {selectedBill?.phone}
            </p>
            <p>
              <b>Date : </b>
              {purchesDate}
            </p>
          </div>
          <Table
            pagination={false}
            columns={billColumn}
            dataSource={selectedBill?.cartItems}
          />
          <div className="bill-amount mt-3 d-flex flex-column text-end">
            <h5>
              <b>Sub Total : </b>
              {selectedBill?.subTotal} $
            </h5>
            <h5>
              <b>Tax : </b>
              {selectedBill?.tax} $
            </h5>
          </div>
          <div className="border-dashed mt-2"></div>
          <h4 className="my-2 text-end">
            <b>Grand Total : </b>
            {selectedBill?.grandTotal} $
          </h4>
          <div className="border-dashed"></div>
          <div className="text-center mt-3">
            <span>Thanks for visit our shop</span>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <Button onClick={handlePrint} type="primary">
            Print Bill
          </Button>
        </div>
      </Modal>
    </DefaultLayout>
  );
};

export default Bill;
