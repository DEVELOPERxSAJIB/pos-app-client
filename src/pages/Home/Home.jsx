import "./Home.css";
import { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { Col, Row } from "antd";
import Product from "../../components/Product/Product";
import { useDispatch } from "react-redux";
import { HIDE_LOADING, SHOW_LOADING } from "../../redux/products/actionTypes";

const Home = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [selectedCategory, setSelectedCategory] = useState("fruits");

  const getAllProduct = async () => {
    dispatch({ type: SHOW_LOADING });
    await axios
      .get(`${baseURL}/product/get-all-product`, {
        withCredentials: true,
      })
      .then((res) => {
        setProduct(res.data);
        dispatch({ type: HIDE_LOADING });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const category = [
    {
      name: "fruits",
      image: `https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/325253_2200-732x549.jpg`,
    },
    {
      name: "vegetable",
      image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRRMOmSnTJiIVGiwdQbdSxC8mBPnZD4cFsw&usqp=CAU`,
    },
    {
      name: "meat",
      image: `https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/06/30/10/istock-483027918.jpg`,
    },
  ];

  return (
    <DefaultLayout>
      <Row>
        <Col className="mb-1">
          <div className="d-flex top-filter-menu">
            {category.map((item, index) => {
              return (
                <div
                  onClick={() => setSelectedCategory(item.name)}
                  className={`category-area d-flex ${
                    selectedCategory === item.name
                      && "selected-category shadow"
                  }`}
                  key={index}
                >
                  <h4>{item.name}</h4>
                  <img src={item.image} alt="" height={60} width={80} />
                </div>
              );
            })}
          </div>
        </Col>
      </Row>

      <hr />

      <Row gutter={16}>
        {product?.product
        .filter((data) => data.category === selectedCategory )
          .map((item) => {
            return (
              <Col
                lg={6}
                md={12}
                sm={24}
                xs={24}
                className="mb-3 mt-1"
                key={item._id}
              >
                <Product item={item} />
              </Col>
            );
          })}
      </Row>
    </DefaultLayout>
  );
};

export default Home;
