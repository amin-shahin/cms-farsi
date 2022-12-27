import React, { useEffect, useState } from "react";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import Errorbox from "../Errorbox/Errorbox";
import TableProducts from "../TableProducts/TableProducts";
import "./Products.css"

const Products = () => {

const [allProducts,setAllProducts] = useState([])

useEffect(()=>{
    getAllProducts()
  },[])
  
  const getAllProducts = ()=>{
    fetch('http://localhost:8000/api/products')
    .then(response => response.json())
    .then(products => setAllProducts(products))
  }
    return ( 
        <>
        <AddNewProduct getAllProducts={getAllProducts}/>
        <TableProducts getAllProducts={getAllProducts} allProducts={allProducts}  />
        </>
     );
}
 
export default Products;