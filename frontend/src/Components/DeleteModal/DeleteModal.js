import React from "react";
import { useContext } from "react";
import ReactDOM  from "react-dom";
import { ModalContext } from "../../Contexts/ContextModal/ContextModal";
import "./DeleteModal.css"

const DeleteModal = ({submitAction,title}) => {
 


const contextData = useContext(ModalContext)

const cancelDeleteModal = () =>{
    contextData.setIsShowDeleteModal(false)
    contextData.setIsShowAcceptModal(false)
    contextData.setIsShowRejectModal(false)
}


    return ReactDOM.createPortal ( 
        <div className="modal-parent active">
            <div className="delete-modal">
                <h1>{title}</h1>
                <div className="btns-delete-modal">
                    <button className="btn-modal btn-modal-apply" onClick={()=> submitAction()}>بله</button>
                    <button className="btn-modal btn-modal-reject" onClick={cancelDeleteModal}>خیر</button>
                </div>
            </div>
        </div>,
        document.getElementById('modals')
     );
}
 
export default DeleteModal;