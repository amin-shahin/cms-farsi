import React from "react"
import Products from "./Components/Products/Products"
import Home from "./Components/Home/Home"
import Comments from "./Components/Comments/Comments"
import Users from "./Components/Users/Users"
import Orders from "./Components/Orders/Orders"
import Discount from "./Components/Discounts/Discount"


let routes =[
    {path:"/",element:<Home/>},
    {path:"/products",element:<Products/>},
    {path:"/comments",element:<Comments/>},
    {path:"/users",element:<Users/>},
    {path:"/orders",element:<Orders/>},
    {path:"/discount",element:<Discount/>}
]

export default routes