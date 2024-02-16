import { Table } from "antd";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

const Customer = () => {

  const [customers, setCustomers] = useState();

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Customer Number",
      dataIndex: "phone",
    },
    {
      title: "Created At",
      render : (record) => <span>{record.createdAt.toString().substring(0, 10)}</span>
    },
  ];

  useEffect(() => {
    axios
      .get(`${baseURL}/bills/all-bills`)
      .then((res) => {
        const data = res.data.payload;
        data.reverse();
        setCustomers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <DefaultLayout>
      {" "}
      <div className="d-flex justify-content-between">
        <h3>Our Customers</h3>
      </div>
      <Table columns={columns} dataSource={customers} bordered />
    </DefaultLayout>
  );
};

export default Customer;
