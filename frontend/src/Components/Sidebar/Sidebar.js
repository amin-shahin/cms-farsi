import React from 'react'
import "./Sidebar.css"
import {AiOutlineHome} from "react-icons/ai"
import {MdOutlineProductionQuantityLimits} from "react-icons/md"
import {GoComment} from "react-icons/go"
import {HiOutlineUsers} from "react-icons/hi"
import {RiShoppingBag2Line} from "react-icons/ri"
import {TbShoppingCartDiscount} from "react-icons/tb"
import { Link, Navigate, NavLink } from 'react-router-dom'



export default function Sidebar() {

    // const addActiceClass=(event)=>{
    //     let target = event.target.parentElement
    //     target.classList.add('active')
    // }
    
  return (
    <div className='sidebar'>
        <h1 className="sidebar-title">به داشبورد  خود خوش آمدید</h1>

        <ul className="sidebar-links">

            <NavLink to="/" >
                <AiOutlineHome className='sidebar-icon' />
                صفحه اصلی
            </NavLink>

            <NavLink to="/products" >
                <MdOutlineProductionQuantityLimits className='sidebar-icon'/>
               محصولات
            </NavLink>

            <NavLink to="/comments">
                <GoComment className='sidebar-icon'/>
               کامنت ها
            </NavLink>
            <NavLink to="/users">
                <HiOutlineUsers className='sidebar-icon'/>
               کاربران
            </NavLink>
            <NavLink to="/orders">
                <RiShoppingBag2Line className='sidebar-icon'/>
               سفارشات
            </NavLink>
            <NavLink to="/discount">
                <TbShoppingCartDiscount className='sidebar-icon'/>
               تخفیف ها
            </NavLink>
        </ul>

    </div>
  )
}
