import React, { useState } from "react";
import { MdDriveFileRenameOutline, MdFavoriteBorder } from "react-icons/md";
import { BiStore } from "react-icons/bi";
import { AiOutlinePicture } from "react-icons/ai";
import { BiDollar } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { GrMoney } from "react-icons/gr";
import "./AddNewProduct.css";

const AddNewProduct = ({ getAllProducts }) => {
  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColors, setProductNewColors] = useState("");
  const [productNewPopularity, setProductNewPopularity] = useState("");
  const [productNewCount, setProductNewCount] = useState("");

  const addNewProductInSite = {
    title: productNewTitle,
    price: productNewPrice,
    count: productNewCount,
    img: productNewImg,
    popularity: productNewPopularity,
    sale: productNewSale,
    colors: productNewColors,
  };

  const emptyInputs = () => {
    setProductNewTitle("");
    setProductNewPrice("");
    setProductNewImg("");
    setProductNewSale("");
    setProductNewColors("");
    setProductNewPopularity("");
    setProductNewCount("");
  };

  const addNewProduct = (event) => {
    event.preventDefault();

    fetch('http://localhost:8000/api/products',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewProductInSite),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllProducts();
        emptyInputs()
      });
  };

  return (
    <div className="products-main">
      <h1 className="product-title">افزودن محصول جدید</h1>
      <div className="form-container">
        <form action="#" className="form-products-add">
          <div className="form-products-container">
            <div className="form-add-product-group">
              <div className="input-icon">
                <MdDriveFileRenameOutline />
                <input
                  className="add-product-input"
                  type="text"
                  placeholder="نام  محصول را وارد نمایید"
                  value={productNewTitle}
                  onChange={(e) => setProductNewTitle(e.target.value)}
                />
              </div>

              <div className="input-icon">
                <GrMoney />
                <input
                  className="add-product-input"
                  type="text"
                  placeholder="قیمت  محصول را وارد نمایید"
                  onChange={(e) => setProductNewPrice(e.target.value)}
                  value={productNewPrice}
                />
              </div>

              <div className="input-icon">
                <AiOutlinePicture />
                <input
                  className="add-product-input"
                  type="text"
                  placeholder="آدرس  عکس محصول را وراد نمایید"
                  onChange={(e) => setProductNewImg(e.target.value)}
                  value={productNewImg}
                />
              </div>

              <div className="input-icon">
                <BiStore />
                <input
                  className="add-product-input"
                  type="text"
                  placeholder="موجودی  محصول را وراد نمایید"
                  onChange={(e) => setProductNewCount(e.target.value)}
                  value={productNewCount}
                />
              </div>

              <div className="input-icon">
                <MdFavoriteBorder />
                <input
                  className="add-product-input"
                  type="text"
                  placeholder="محبوبیت  محصول را وارد نماید"
                  onChange={(e) => setProductNewPopularity(e.target.value)}
                  value={productNewPopularity}
                />
              </div>

              <div className="input-icon">
                <BiDollar />
                <input
                  className="add-product-input"
                  type="text"
                  placeholder="میزان  فروش محصول را وراد نمایید"
                  onChange={(e) => setProductNewSale(e.target.value)}
                  value={productNewSale}
                />
              </div>

              <div className="input-icon">
                <IoColorPaletteOutline />
                <input
                  className="add-product-input"
                  type="text"
                  placeholder="تعداد  رنگ محصول را وراد نمایید"
                  onChange={(e) => setProductNewColors(e.target.value)}
                  value={productNewColors}
                />
              </div>
            </div>

            <button className="apply-btn" onClick={addNewProduct}>
              ثبت محصول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
