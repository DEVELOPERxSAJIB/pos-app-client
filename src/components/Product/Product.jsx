import { Button } from "antd";
import "./Product.css";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/products/action";

const Product = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="item">
      <h1>{item.name}</h1>
      <img src={item.image} alt="" />
      <h4>
        <b>Price : </b>
        {item.price} $
      </h4>
      <div className="d-flex justify-content-end">
        <Button onClick={() => handleAddToCart(item)} type="primary">
          <PlusOutlined /> Add cart
        </Button>
      </div>
    </div>
  );
};

export default Product;
