import React, { Children } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ModalContext } from "../../Contexts/ContextModal/ContextModal";
import "./DetailsModal.css"

const DetailsModal = ({children,onHide}) => {

const contextData = useContext(ModalContext)

useEffect(()=>{
    const closeDetailsModal =(event)=>{
        if(event.code === 'Escape'){
            contextData.setIsShowDetailsModal(false)
        }
    }
    window.addEventListener('keydown',closeDetailsModal)

    return ()=> window.removeEventListener('keydown',closeDetailsModal)
})


    return ( 
        <div className="modal-parent active">
            <div className="details-modal">
                {children}
            </div>
        </div>
     );
}
 
export default DetailsModal;