import React, { useContext } from "react";
import {Route, Routes} from "react-router-dom"
import { Context } from "..";
import Shop from '../pages/shop'
import { authRoutes, publicRoutes } from "../utils/routes";


const AppRouter = () =>{
    const {user} = useContext(Context)
    console.log(user, 'approuter')
    return(
        <Routes >
            { authRoutes  && authRoutes.map(({path, Component})=>
           <Route key={path} path={path} element={<Component/>} exact/> 
           )}
            { publicRoutes.map(({path, Component})=>
           <Route key={path} path={path} element={<Component/>} exact/> 
           )}
           <Route path='*' element={<Shop/>} />
        </Routes>
        
    )
}
export default AppRouter