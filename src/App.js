import React, { useState, useEffect } from "react";
import shopList from "./data";
import "./App.css";

const typeList = ["all", "Lipstick", "Lip Gloss", "Liquid Lipstick"];
const brandList = ["all", "Dior", "Armani Beauty", "Charlotte Tilbury"];
const sortList = ["default", "Lowest to Highest", "Highest to Lowest"];

const App = () => {
  const [list, setList] = useState(shopList);
  const [cartList, setCartList] = useState([]);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState("all");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState("default");

  const handleChangeCart = (data, isDelete, isDeleteAll) => {
    const item = cartList.find((el) => el.name === data.name);
    const index = cartList.findIndex((el) => el.name === data.name);
    const afterCartList = [...cartList];
    if (item) {
      if (isDeleteAll) {
        afterCartList.splice(index, 1);
      } else {
        afterCartList.splice(index, 1, {
          ...item,
          num: isDelete ? item.num - 1 : item.num + 1,
        });
      }
    } else {
      afterCartList.push({ ...data, num: 1 });
    }
    setCartList(afterCartList);
  };

  useEffect(() => {
    const afterList = shopList
      .filter((item) => {
        if (type === "all") {
          return item;
        }
        return item.type === type;
      })
      .filter((item) => {
        if (brand === "all") {
          return item;
        }
        return item.brand === brand;
      })
      .sort((a, b) => {
        if (sort === "default") {
          return a;
        }
        if (sort === "Lowest to Highest") {
          return a.price - b.price;
        }
        return b.price - a.price;
      });
    setList(afterList);
  }, [type, brand, sort]);

  useEffect(() => {
    let num = 0;
    cartList.forEach((item) => {
      num += item.num * item.price;
    });
    setTotal(num.toFixed(2));
  }, [cartList]);

  return (
    <div className="App">
      <header>Lipstick Kingdom</header>
      <div className="content">
        <div className="left">
          <div className="top">
            <div className="item">
              <div className="title">Type：</div>
              {typeList.map((item) => (
                <div
                  onClick={() => setType(item)}
                  className={`tag ${item === type ? "active" : ""}`}
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="item">
              <div className="title">Brand:</div>
              {brandList.map((item) => (
                <div
                  onClick={() => setBrand(item)}
                  className={`tag ${item === brand ? "active" : ""}`}
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="item">
              <div className="title">Sort by Price:</div>
              {sortList.map((item) => (
                <div
                  onClick={() => setSort(item)}
                  className={`tag ${item === sort ? "active" : ""}`}
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="list">
            {list.map((item) => (
              <div key={item.name} className="item">
                <img src={item.img} alt="" />
                <div className="name">{item.name}</div>
                <div className="price">${item.price}</div>
                <div className="type">{item.type}</div>
                <div className="brand">{item.brand}</div>
                <div onClick={() => handleChangeCart(item)} className="btn">
                  Add to Cart
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="right">
          <div className="title">Shopping Cart</div>
          <div className="list">
            {cartList.map((item) => (
              <div key={item.name} className="item">
                <img src={item.img} alt="" />
                <div className="name">{item.name}</div>
                <div className="price">${item.price}</div>
                <div className="type">{item.type}</div>
                <div className="brand">{item.brand}</div>
                <div className="num">
                  <div
                    onClick={() => {
                      if (item.num !== 1) {
                        handleChangeCart(item, true);
                      }
                    }}
                    className="subtract"
                  >
                    {item.num === 1 ? "" : "-"}
                  </div>
                  <div className="count">{item.num}</div>
                  <div onClick={() => handleChangeCart(item)} className="add">
                    +
                  </div>
                </div>
                <div
                  onClick={() => handleChangeCart(item, false, true)}
                  className="btn"
                >
                  Remove
                </div>
              </div>
            ))}
          </div>
          <div className="bottom">
            Total: ${total}
            <div className="flex-all" />
            <div
              onClick={() => alert(`Checkout Total: $${total}`)}
              className="btn"
            >
              Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
