import React, { useState, useEffect, useContext } from "react";
import Errorbox from "../Errorbox/Errorbox";
import "./Comments.css";
import DetailsModal from "../DetailsModal/DetailsModal";
import { ModalContext } from "../../Contexts/ContextModal/ContextModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";


const Comments = () => {
  const [allComments, setAllComments] = useState([]);
  const [mainComment, setMainComment] = useState("");  
  const [commentID,setCommentID] = useState(null)
  const contextData = useContext(ModalContext);


  const getAllComments =()=>{
    fetch("http://localhost:8000/api/comments")
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      setAllComments(result);
    });
  }
  useEffect(() => {
    getAllComments()
  },[]);


  const deleteComment = ()=>{
    fetch(`http://localhost:8000/api/comments/${commentID}`,{
        method: 'DELETE'
    }).then(response =>response.json())
    .then(data =>{
        contextData.setIsShowDeleteModal(false)
        getAllComments()

    })
  }

  const editComment = ()=>{
    
    fetch(`http://localhost:8000/api/comments/${commentID}`,{
        method:'PUT',
        headers :{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            body:mainComment
        })
    }).then(res =>res.json())
    .then(result => {
        contextData.setIsShowEditModal(false)
        getAllComments()
    })
  }

const acceptComment =()=>{
    fetch(`http://localhost:8000/api/comments/accept/${commentID}`,{
        method:'POST', 
    }).then(res => res.json())
    .then(result =>{
        contextData.setIsShowAcceptModal(false)
        getAllComments()
    })
}
const rejectComment = ()=>{
  fetch(`http://localhost:8000/api/comments/reject/${commentID}`,{
    method:'POST', 
}).then(res => res.json())
.then(result =>{
    contextData.setIsShowRejectModal(false)
    getAllComments()
})
}

  return (
    <div className="cms-main">
      {allComments.length ? (
        <table className="cms-table">
          <thead>
            <tr className="heading-table">
              <th>نام کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ</th>
              <th>ساعت</th>
            </tr>
          </thead>
          <tbody>
            {allComments.map((comment) => (
              <tr key={comment.id} className="comments-tr">
                <td>{comment.userID}</td>
                <td>{comment.productID}</td>
                <td>
                  <button
                    className="btn-comment btn-view-comment"
                    onClick={() => {
                      setMainComment(comment.body);
                      contextData.setIsShowDetailsModal(true);
                    }}
                  >
                    دیدن متن
                  </button>
                </td>
                <td>{comment.date}</td>
                <td>{comment.hour}</td>
                <td>
                  <button className="btn-comment" onClick={()=>{
                    contextData.setIsShowDeleteModal(true)
                    setCommentID(comment.id)
                  }}>حذف</button>
                  <button className="btn-comment" onClick={()=>{
                      setMainComment(comment.body);
                      setCommentID(comment.id)
                      contextData.setIsShowEditModal(true)
                  }}>ویرایش</button>
                  <button className="btn-comment">پاسخ</button>
                  {!comment.isAccept ? (
                                      <button className="btn-comment" onClick={()=>{
                                        contextData.setIsShowAcceptModal(true)
                                        setCommentID(comment.id)
                                      }}>تایید</button>
                  ):(
                    <button className="btn-comment" onClick={()=>{
                      contextData.setIsShowRejectModal(true)
                      setCommentID(comment.id)
                    }}>رد کامنت</button>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Errorbox massage="هیچ کامنتی یافت نشد" />
      )}

      
      {contextData.isShowDetailsModal && (
        <DetailsModal >
          <p className="text-comment">{mainComment}</p>
          <button
            className="btn-close-comment"
            onClick={() => contextData.setIsShowDetailsModal(false)}
          >
            بستن
          </button>
        </DetailsModal>
      )}

      {contextData.isShowDeleteModal && (
        <DeleteModal submitAction={deleteComment} title='آیا از حذف اطمینان دارید؟'/>
      )}

    {contextData.isShowEditModal && (
        <EditModal editInformationAction={editComment}>
            <textarea value={mainComment} onChange={(e)=> setMainComment(e.target.value)} >
            </textarea>
        </EditModal>
    )}

    {contextData.isShowAcceptModal && (
        <DeleteModal title='آیا از تایید اطمینان دارید؟' submitAction={acceptComment}/>
    )}
        {contextData.isShowRejectModal && (
        <DeleteModal title='آیا از رد این پیام اطمینان دارید؟' submitAction={rejectComment}/>
    )}
    </div>
  );
};

export default Comments;
