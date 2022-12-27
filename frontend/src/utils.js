import React from "react";
import { useContext } from "react";
import { ModalContext } from "./Contexts/ContextModal/ContextModal";


const GetAllProducts=()=>{

    const contextData = useContext(ModalContext)
    fetch('http://localhost:8000/api/products')
    .then(response => response.json())
    .then(products => contextData.setAllProducts(products))


  }


export {GetAllProducts}