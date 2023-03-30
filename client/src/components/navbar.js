import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import {Nav, Navbar,  Button, InputGroup, Form} from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import {observer} from 'mobx-react-lite'
import {useNavigate} from 'react-router-dom'
import { admins_route, basket_route, login_route, userpage_route } from "../utils/const";
import { searchDevice } from "../http/deviceApi";

const NvBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()
    const {device}= useContext(Context)
    console.log(user.isAdmin)

    const logout = () =>{
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
        history('/')
    }
    const navStyle = {
        background : '#8B008B',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        border : 10
     }
     const [seardevice, setSearch_device]= useState()
     const search = async()=>{
        device.setSearcedDevice({})
        let data
        data = await searchDevice(seardevice)
        
        return device.setSearcedDevice(data) || device.setSearcedDevice({})
     }
     
     useEffect(()=>{
        
     },[seardevice])
     

    return(
        <Navbar style={navStyle}  fixed="top">
            <NavLink style={{color: 'white'}} to='/'> BuyDevice</NavLink>
            
            {user.isAuth ?  
                <Nav className="ml-auto" style={{color : 'white'}}>
                {user.isAdmin ?   
                    
                    <Button variant="outline-light"
                     onClick={() => history(admins_route)}
                    >
                        Profile
                    </Button>
                    :
                    <Button variant="outline-light"
                     onClick={() => history(userpage_route)}
                    >
                        Profile 
                    </Button>
                }   
                    <Button variant = "outline-light"
                    onClick = {() => history(basket_route)}
                    >
                        Basket
                    </Button>

                    <Button variant="outline-light"
                     className="p-3"
                     onClick={()=> logout()} 
                     >
                        Logout 
                    </Button>
                </Nav>
          :
          <Nav className="ml-auto" style={{color:'white'}}>
            <Button variant="outline-light" onClick={()=> history(login_route)}>Login </Button>
          </Nav>
        }

        <InputGroup className="mb-3" style={{width: 200}}>
        <Form.Control
          placeholder="Search..."
          aria-label="Recipient's username"
          value = {seardevice}
          onChange={e => setSearch_device(e.target.value)}
          />
          {seardevice !== undefined || null ?
            <li>{device.searcheddevice }</li>
            :
                        <div></div>
        }
        </InputGroup>


       </Navbar>   
    )
})

export default NvBar;