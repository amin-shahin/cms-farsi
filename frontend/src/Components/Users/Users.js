import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../Contexts/ContextModal/ContextModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
import Errorbox from "../Errorbox/Errorbox";
import "./Users.css"


const Users = () => {

    const contextData = useContext(ModalContext)
    const [allUsers,setAllUsers] = useState([])
    const [userInformation,setUserInformation] = useState({})
    const [userID,setUserID] = useState(null)

    
    const [updateFirstnameUser,setUpdateFirstnameUser] =useState('')
    const [updateLastnameUser,setUpdateLastnameUser] =useState('')
    const [updateUserNameUser,setUpdateUserNameUser] =useState('')
    const [updatePasswordUser,setUpdatePasswordUser] =useState('')
    const [updatePhoneUser,setUpdatePhoneUser] =useState('')
    const [updateCityUser,setUpdateCityUser] =useState('')
    const [updateEmailUser,setUpdateEmailUser] =useState('')
    const [updateAddressUser,setUpdateAddressUser] =useState('')    
    const [updateScoreUser,setUpdateScoreUser] =useState('')
    const [updateBuyUser,setUpdateBuyUser] =useState('')

    const getAllUsers = ()=>{
        fetch(`http://localhost:8000/api/users`)
        .then(res => res.json())
        .then(result =>{
            setAllUsers(result)
        })
    }
    useEffect(()=>{
        getAllUsers()
    },[])

    const removeUser = ()=>{
        fetch(`http://localhost:8000/api/users/${userID}`,{
            method: 'DELETE',
        }).then(res => res.json())
        .then(result => {
            contextData.setIsShowDeleteModal(false)
            getAllUsers()
        })
    }

    const updateUserINformations = {
        firsname:updateFirstnameUser,
        lastname:updateLastnameUser,
        username:updateUserNameUser,
        password:updatePasswordUser,
        phone:updatePhoneUser,
        city:updateCityUser,
        email:updateEmailUser,
        address:updateAddressUser,
        score:updateScoreUser,
        buy:updateBuyUser
    }

    const editInformationUser = ()=>{
        fetch(`http://localhost:8000/api/users/${userID}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(updateUserINformations)
        }).then(res => res.json())
        .then(result =>{

            contextData.setIsShowEditModal(false)
            getAllUsers()
        })
       
    }

    return ( 
        <div className="cms-main">
            <h1 className="users-title">???????? ??????????????</h1>
        { allUsers.length ? (
             <table className="cms-table">
             <thead>
               <tr className="heading-table">
                 <th>?????? ?? ?????? ????????????????</th>
                 <th>?????? ????????????</th>
                 <th>??????????</th>
                 <th>????????????</th>
                 <th  className="td-email">??????????</th>
               </tr>
             </thead>
             <tbody>
               {allUsers.map((user) => (
                 <tr key={user.id} className="user-tr">
                   <td>{user.firsname}{" "}{user.lastname}</td>
                   <td>{user.username}</td>
                   <td>{user.password}</td>
                   <td>{user.phone}</td>
                   <td className="td-email">{user.email}</td>
                   <td>
                     <button className="btn-user" onClick={()=>{
                        setUserID(user.id)
                        contextData.setIsShowDeleteModal(true)
                     }}>??????</button>
                     <button className="btn-user" onClick={()=>{
                        setUserID(user.id)
                        contextData.setIsShowEditModal(true)
                        setUpdateAddressUser(user.address)
                        setUpdateBuyUser(user.buy)
                        setUpdateCityUser(user.city)
                        setUpdateEmailUser(user.email)
                        setUpdateFirstnameUser(user.firsname)
                        setUpdateLastnameUser(user.lastname)
                        setUpdatePasswordUser(user.password)
                        setUpdatePhoneUser(user.phone)
                        setUpdateScoreUser(user.score)
                        setUpdateUserNameUser(user.username)
                     }}>????????????</button>

                       <button className="btn-user" onClick={()=>{
                        contextData.setIsShowDetailsModal(true)
                        setUserInformation(user)
                    }}>????????????</button>
                    
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        ):(<Errorbox massage="?????? ???????????? ???????? ??????"/> ) 
        }

       {contextData.isShowDetailsModal && (
            <DetailsModal >
                    
            <table className="cms-table">
                <thead>
                    <tr>
                        <th>??????</th>
                        <th>?????????? ????????</th>
                        <th>????????????</th>
                        <th>????????</th>
                    </tr>
                </thead>
                <tbody>
               
                    <tr >
                        <td>{userInformation.city}</td>
                        <td>{Number(userInformation.buy).toLocaleString()}?????????? </td>
                        <td>{userInformation.score}</td>
                        <td>{userInformation.address}</td>
                    </tr>
                        
                </tbody>
            </table>

            <button
            className="btn-close-user"
            onClick={() =>contextData.setIsShowDetailsModal(false)
            }
            >
            ????????
            </button>
            </DetailsModal>
       )}
       {contextData.isShowDeleteModal && (
            <DeleteModal title='?????? ???? ?????? ?????? ?????????? ?????????????? ????????????' submitAction={removeUser}/>
       )}
        {contextData.isShowEditModal && (
            <EditModal editInformationAction={editInformationUser} >
                <div className="edit-user-info-input-group">
                    <input type="text" className="edit-user-info-input"  value={updateFirstnameUser} onChange={(event) => setUpdateFirstnameUser(event.target.value)} placeholder="?????????? ???????? ?????? ???? ???????? ????????" />
                </div>

                <div className="edit-user-info-input-group">
                    <input type="text" className="edit-user-info-input"  value={updateLastnameUser} onChange={(event) => setUpdateLastnameUser(event.target.value)} placeholder="?????????? ???????? ?????? ???????????????? ???? ???????? ????????" />
                </div>

                <div className="edit-user-info-input-group">
                    <input type="text" className="edit-user-info-input"  value={updateUserNameUser} onChange={(event) => setUpdateUserNameUser(event.target.value)} placeholder="?????????? ???????? ?????? ???????????? ???? ???????? ????????" />
                </div>

                <div className="edit-user-info-input-group">
                    <input type="text" className="edit-user-info-input"  value={updatePasswordUser} onChange={(event) => setUpdatePasswordUser(event.target.value)} placeholder="?????????? ???????? ?????????? ???? ???????? ????????" />
                </div>

                <div className="edit-user-info-input-group">
                    <input type="text" className="edit-user-info-input" value={updatePhoneUser} onChange={(event) => setUpdatePhoneUser(event.target.value)}  placeholder="?????????? ???????? ???????????? ???? ???????? ????????" />
                </div>

                <div className="edit-user-info-input-group">
                    <input type="text" className="edit-user-info-input" value={updateCityUser}  onChange={(event) => setUpdateCityUser(event.target.value)} placeholder="?????????? ???????? ?????? ???? ???????? ????????" />
                </div>

                <div className="edit-user-info-input-group">
                    <input type="text" className="edit-user-info-input" value={updateEmailUser} onChange={(event) => setUpdateEmailUser(event.target.value)}  placeholder="?????????? ???????? ?????????? ???? ???????? ????????" />
                </div>

                <div className="edit-user-info-input-group">
                    <textarea type="text" className="edit-user-info-input"  value={updateAddressUser} onChange={(event) => setUpdateAddressUser(event.target.value)} placeholder="?????????? ???????? ???????? ???? ???????? ????????">
                    
                    </textarea>
                </div>

                <div className="edit-user-info-input-group">
                    <input type="text" className="edit-user-info-input" value={updateScoreUser} onChange={(event) => setUpdateScoreUser(event.target.value)}  placeholder="?????????? ???????? ???????????? ???? ???????? ????????" />
                </div>

                <div className="edit-user-info-input-group">
                    <input type="text" className="edit-user-info-input" value={updateBuyUser} onChange={(event) => setUpdateBuyUser(event.target.value)}  placeholder="?????????? ???????? ???????? ???????? ???? ???????? ????????" />
                </div>

             
            </EditModal>
        )}

        </div>
     );
}
 
export default Users;