import React, { useContext, useEffect, useState} from 'react';

import {BrowserRouter} from "react-router-dom"
import './index.css';
//import App from './App';
import AppRouter from './components/AppRouter';
import NvBar from './components/navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './http/userApi';
import { Spinner } from 'react-bootstrap';

const App = observer(()=> {
  const {user} = useContext(Context)
  const[loading, setLoading] = useState(true)
   
  useEffect(()=>{
      check().then(data=>{
     
      if(data.role === 'ADMIN'){
        console.log('admin')
        user.setIsAdmin(true)
      }else{
        console.log('user')
      }
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(()=> setLoading(false))
  }, [user])
  if (loading){
    return <Spinner animation='grow'/>
  }
  
  return ( 
    
    <BrowserRouter>
      <NvBar/>
      <div style={{marginTop: 80}}>
      <AppRouter  />
      </div>
    </BrowserRouter>
    
  )
  })

export default App;
