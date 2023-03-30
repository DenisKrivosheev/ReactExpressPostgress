import { Component } from 'react';
import Adminpage from '../pages/adminpage';
import Auth from '../pages/auth';
import Basketpage from '../pages/basketpage';
import Devicepage from '../pages/devicepage';
import Userpage from '../pages/userpage';
import { admins_route, basket_route, device_route, login_route, register_route, userpage_route } from '../utils/const';



export const authRoutes = [
    {
        path: admins_route,
        Component: Adminpage 
    },
    {
        path: basket_route,
        Component: Basketpage 
    },
    {
        path : userpage_route,
        Component: Userpage
    }
]



export const publicRoutes = [
    {
        path: login_route,
        Component: Auth,
    },
    {
        path: register_route,
        Component:  Auth ,
    },
    {
        path: device_route + '/:id',
        Component: Devicepage 
    }
]
