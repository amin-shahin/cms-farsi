import React, { Children, useEffect } from "react";
import { useContext } from "react";
import { ModalContext } from "../../Contexts/ContextModal/ContextModal";
import './EditModal.css'


const EditModal = ({children,editInformationAction}) => {

    const contextData = useContext(ModalContext)
    useEffect(()=>{
        const closeEditModal =(event)=>{
            if(event.code === 'Escape'){
                contextData.setIsShowEditModal(false)
            }
        }
        window.addEventListener('keydown',closeEditModal)
    
        return ()=> window.removeEventListener('keydown',closeEditModal)
    })

    return ( 
        <div className="modal-parent active">
            <div className="edit-modal">
             <h1>اطلاعات جدید را وارد نمایید</h1>
             <div className="form-edit-container">
                <form action="#" className="form-products-edit" onClick={(e)=> e.preventDefault()}>
                    <div className="form-products-container">

                        <div className="form-edit-container-product-group"> 
                            {children}
                        </div>
                            <button className="apply-edit-btn" onClick={()=>editInformationAction()}>ثبت ویرایش اطلاعات</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
     );
}
 
export default EditModal;