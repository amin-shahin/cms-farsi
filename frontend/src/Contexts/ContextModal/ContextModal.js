import { useState } from "react";
import { createContext } from "react";
const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);



  return (
    <ModalContext.Provider value={{
         isShowDeleteModal,
         setIsShowDeleteModal,
         isShowDetailsModal,
         setIsShowDetailsModal,
         isShowEditModal,
         setIsShowEditModal,
         isShowAcceptModal,
         setIsShowAcceptModal,
         isShowRejectModal,
         setIsShowRejectModal,
        }}>
      {children}
    </ModalContext.Provider>
  );
};
export{ModalContext}
export default ModalProvider