import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ModalContext } from "../../Contexts/ContextModal/ContextModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
import Errorbox from "../Errorbox/Errorbox";
import "./TableProducts.css";
import { MdDriveFileRenameOutline, MdFavoriteBorder } from "react-icons/md";
import { BiStore } from "react-icons/bi";
import { AiOutlinePicture } from "react-icons/ai";
import { BiDollar } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { GrMoney } from "react-icons/gr";

const TableProducts = ({ getAllProducts, allProducts }) => {
  const [productID, setProductID] = useState(null);
  const [mainProductsInfos, setMainProductsInfos] = useState({});
  const [productEditTitle, setProductEditTitle] = useState("");
  const [productEditPrice, setProductEditPrice] = useState("");
  const [productEditImg, setProductEditImg] = useState("");
  const [productEditSale, setProductEditSale] = useState("");
  const [productEditColors, setProductEditColors] = useState("");
  const [productEditPopularity, setProductEditPopularity] = useState("");
  const [productEditCount, setProductEditCount] = useState("");
  const contextData = useContext(ModalContext);

  const removeProduct = () => {
    contextData.setIsShowDeleteModal(true);
  };
  const submitAction = () => {
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        contextData.setIsShowDeleteModal(false);
        getAllProducts();
      });
  };
  const detailsProduct = (product) => {
    contextData.setIsShowDetailsModal(true);
    setMainProductsInfos(product);
  };

  const editProduct = (product) => {
    contextData.setIsShowEditModal(true);

    setProductEditTitle(product.title);
    setProductEditPrice(product.price);
    setProductEditImg(product.img);
    setProductEditSale(product.sale);
    setProductEditPopularity(product.popularity);
    setProductEditCount(product.count);
    setProductEditColors(product.colors);
  };
  const editProductInformation = (event) => {
    // event.prevendefault()

    const editProductInformationData = {
      title: productEditTitle,
      price: productEditPrice,
      count: productEditCount,
      img: productEditImg,
      popularity: productEditPopularity,
      sale: productEditSale,
      colors: productEditColors,
    };

    fetch(`http://localhost:8000/api/produts/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editProductInformationData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        contextData.setIsShowEditModal(false);
        getAllProducts();
      });
  };

  return (
    <div className="table-container">
      {allProducts.length ? (
        <table className="table-products">
          <thead>
            <tr className="table-heading">
              <th>??????</th>
              <th>?????? ??????????</th>
              <th>????????</th>
              <th>????????????</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product.id} className="products-tr">
                <td>
                  <img
                    src={product.img}
                    alt={product.title}
                    className="img-product-table"
                  />
                </td>
                <td>{product.title}</td>
                <td>{Number(product.price).toLocaleString()} ??????????</td>
                <td>{product.count}</td>
                <td className="btns">
                  <button
                    className="btn-table-product"
                    onClick={() => detailsProduct(product)}
                  >
                    ????????????
                  </button>
                  <button
                    className="btn-table-product"
                    onClick={() => {
                      removeProduct();
                      setProductID(product.id);
                    }}
                  >
                    ??????
                  </button>
                  <button
                    className="btn-table-product"
                    onClick={() => {
                      editProduct(product);
                      setProductID(product.id);
                    }}
                  >
                    ????????????
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Errorbox massage="?????? ???????????? ???????? ??????" />
      )}

      {contextData.isShowDeleteModal && (
        <DeleteModal title='?????? ???? ?????? ?????? ?????????? ?????????????? ????????????' submitAction={submitAction} />
      )}
      {contextData.isShowDetailsModal && (
        <DetailsModal title='?????? ???? ?????? ?????????????? ????????????'>
          <table className="cms-table">
            <thead>
              <tr>
                <th>?????????? ????????</th>
                <th>??????????????</th>
                <th> ?????????? ?????? ????????</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Number(mainProductsInfos.sale).toLocaleString()}?????????? </td>
                <td>{mainProductsInfos.popularity} %</td>
                <td>{mainProductsInfos.colors}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
      {contextData.isShowEditModal && (
        <EditModal editInformationAction={editProductInformation}>
          <div className="form-edit-product-group">
            <MdDriveFileRenameOutline />
            <input
              className="edit-input"
              type="text"
              placeholder="?????? ???????? ?????????? ???? ???????? ????????????"
              value={productEditTitle}
              onChange={(e) => setProductEditTitle(e.target.value)}
            />
          </div>

          <div className="form-edit-product-group">
            <GrMoney />
            <input
              className="edit-input"
              type="text"
              placeholder="???????? ???????? ?????????? ???? ???????? ????????????"
              onChange={(e) => setProductEditPrice(e.target.value)}
              value={productEditPrice}
            />
          </div>

          <div className="form-edit-product-group">
            <AiOutlinePicture />
            <input
              className="edit-input"
              type="text"
              placeholder="???????? ???????? ?????? ?????????? ???? ???????? ????????????"
              onChange={(e) => setProductEditImg(e.target.value)}
              value={productEditImg}
            />
          </div>

          <div className="form-edit-product-group">
            <BiStore />
            <input
              className="edit-input"
              type="text"
              placeholder="???????????? ???????? ?????????? ???? ???????? ????????????"
              onChange={(e) => setProductEditCount(e.target.value)}
              value={productEditCount}
            />
          </div>

          <div className="form-edit-product-group">
            <MdFavoriteBorder />
            <input
              className="edit-input"
              type="text"
              placeholder="?????????????? ???????? ?????????? ???? ???????? ??????????"
              onChange={(e) => setProductEditPopularity(e.target.value)}
              value={productEditPopularity}
            />
          </div>

          <div className="form-edit-product-group">
            <BiDollar />
            <input
              className="edit-input"
              type="text"
              placeholder="?????????? ???????? ???????? ?????????? ???? ???????? ????????????"
              onChange={(e) => setProductEditSale(e.target.value)}
              value={productEditSale}
            />
          </div>

          <div className="form-edit-product-group">
            <IoColorPaletteOutline />
            <input
              className="edit-input"
              type="text"
              placeholder="?????????? ???????? ?????? ?????????? ???? ???????? ????????????"
              onChange={(e) => setProductEditColors(e.target.value)}
              value={productEditColors}
            />
          </div>
        </EditModal>
      )}
    </div>
  );
};

export default TableProducts;
