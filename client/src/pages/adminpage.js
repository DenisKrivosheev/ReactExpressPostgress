import { observer } from 'mobx-react-lite';
import React, {useContext, useState, useEffect, useRef}from 'react';
import { Button, Container, Form, Row, Card, Stack, Col } from 'react-bootstrap';
import { Context } from '..';
import CreateBrand from '../components/modals/createBrand';
import Createdevice from '../components/modals/createdevice';
import CreateType from '../components/modals/createType';
import { useNavigate, useParams } from "react-router-dom";
import { getUser, getUsers, deleteUser } from '../http/adminApi';
import e from 'cors';
import ModerStore from '../store/moderStore';




const Adminpage = observer(() =>{
    const {user} = useContext(Context)
    let navigate = useNavigate();
    const {moder} = useContext(Context)
    const [femail, setfEmail] = useState('')
    const [fusername, setfUsername] = useState('')
    const [check, setCheck] = useState('')
    const [fid, setId] = useState(null)
    
    
    useEffect(()=>{
        
        if(check.includes('@' && '.')){
            setfEmail(check)
            setfUsername('')
            setId(null)
        }
        if(contn(check)){
            setfEmail('')
            setfUsername('')
            setId(check)
            }
        else{
            setfUsername(check)
            setfEmail('')
            setId(null)
        }}, [check])

    const contn = (n) =>{
        return /\d/.test(n)
    }
    
    
    
    
    
     const [fuser, setFuser] = useState()
    const find = async() =>{
        try {
            setFuser()
            let data
            data = await getUser(femail, fusername, fid)
            setFuser({data})
            moder.setFindUser(data)
            console.log(fuser)
            return data || setFuser()
                  
            
        } catch (e) {
            alert(e)
        }
    }
     console.log(fuser)
               
    



    const[brandVisible, setBrandVisible] = useState(false)
    const[typeVisible, setTypeVisible] = useState(false)
    const[deviceVisible, setDeviceVisible] = useState(false) 

    
    
    const [render, setRender] = useState(false)

    const delUser = async() =>{
        try {
             if (moder.selUser.role == 'ADMIN'){
                alert('Denide Role')
             }else{
             await deleteUser(moder.selUser.id)
             console.log(moder.selUser.id, moder.selUser.username)
             

             }
        } catch (e) {
            alert(e)            
        }
    }
    
    

    useEffect(()=> {
        getUsers().then(data => moder.setUsers(data))
        console.log(moder.users)
        console.log(moder)
        
    },[])
 

    return(<>
         {user.isAdmin ? 
            <>
            <div className=' d-flex flex-column  align-items-center'>
                <Button 
                onClick={()=> setBrandVisible(true)}
                >Create Brand</Button>
                <Button 
                onClick={()=> setDeviceVisible(true)}
                >Create Device</Button>
                <Button 
                onClick={()=> setTypeVisible(true)}
                >Create Type</Button>
                <CreateBrand show={brandVisible} onHide={()=>setBrandVisible(false)}/>
                <Createdevice show={deviceVisible} onHide={()=>setDeviceVisible(false)}/>
                <CreateType show={typeVisible} onHide={()=>setTypeVisible(false)}/>
            </div>
            <div>

            </div>
            <Container>
            <Row >
               <Col> 
            {moder.users.map(user=>
             <Card 
             style={{cursor: 'pointer'}}
             key={user.id}
             className="p-3"
             onClick={()=> moder.setSelUser(user)}
             border={user.id === moder.selUser.id ? 'danger' : 'light'}
            >
             <Stack className="bg-light" > Id {user.id},| {user.username}, |{user.email}, | {user.role},| uAT {user.updatedat}, | cAT {user.createdat}|</Stack>
              <Button style={{width : 80}} onClick={delUser}> Delete</Button>
              
            </Card>
        )}
        </Col>
        

                <Col>
            <div>
                <Form.Label>Find user</Form.Label>
                 <Form.Control  
                        placeholder="Enter email or username" 
                        className='mt-3'
                        value = {check}
                        onChange = {e => setCheck(e.target.value)}
                        
                    />
                    <Button variant="primary" type="submit" onClick={find}>
                        Find
                    </Button>
                      {fuser !== undefined || null ?
                        /*Object.keys(fuser.data ).map(el=>
                            console.log(el + ':', Object.values(el)
                                )
                        )*/
                        ///////////////
                        <Card>
                            {"Id:"+ JSON.stringify(moder.finduser.id)}|
                            {"Username:"+ JSON.stringify(moder.finduser.username)}| 
                            {"Email:"+ JSON.stringify(moder.finduser.email)}|
                            {"Role:"+ JSON.stringify(moder.finduser.role)}|
                            {"createdAt:"+ JSON.stringify(moder.finduser.createdat)}|
                            {"updatedAt:"+ JSON.stringify(moder.finduser.updatedat)}|
                            <Button variant="primary" type="submit" onClick={delUser}>
                            Delete
                            </Button>
                            <Button>
                           New Role
                            </Button>
                        </Card>
                                                
                        :
                        <div></div>
                      }
                    
                    
                
            </div>
            <div>
            
                <Col>
                {/*Object.keys(fuser).map(e =>
                <Card 
                    style={{cursor: 'pointer'}}
                    key={e.id}
                    className="p-3"
                    
                    border={e.id === moder.selUser.id ? 'danger' : 'light'}
                   >
                    <Stack className="bg-light" > | {e.data}</Stack>
                     <Button style={{width : 80}}> Delete</Button>
                     
                </Card>)  */ }
              </Col>
            
            </div>
            </Col>
            </Row>

            </Container>
         </>   
        :
        <div  className='d-flex flex-column justify-content-center align-items-center'
                        style={{height: window.innerHeight /1.5 }}>
                <h1 className=' text-danger text-center'>
                    Access Denied
                </h1>
                <h2 className=' text-md-center'>
                    You will return to main page
                </h2>
        </div>
        } 
    
    </>
    
    )
})

export default Adminpage;