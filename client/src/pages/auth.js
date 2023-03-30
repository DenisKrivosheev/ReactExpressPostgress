import React, { useState, useEffect, useContext } from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import { Button, Card, Container, Form,  Row } from 'react-bootstrap';
import {register_route, login_route} from '../utils/const'
import { login, registration } from '../http/userApi';
import {observer} from "mobx-react-lite";
import {Context} from '..'


console.log(process.env.REACT_APP_API_URL)

const Auth = observer(() =>{
    const history = useNavigate()
    const{user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === login_route
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const[inpval, setInpval]  = useState('')

const click = async() =>{
        try {
        let data;
        if (isLogin){
            data = await login(email, username, password)
            console.log(data)
        }else {
            data = await registration(email, username, password)
            console.log(data)
        }
        user.setUser(data)
        console.log(user.user)
        user.setIsAuth(true)
        if(data.role === 'ADMIN'){
            console.log('admin')
            user.setIsAdmin(true)
        }else{
            console.log('user')
        }
        history('/')
        } catch (e) {
            alert(e.responce.data.message)
        }

}
useEffect(()=>{
if(inpval.includes('@' && '.')){
    setEmail(inpval)
    setUsername('')
}
else{
    setUsername(inpval)
    setEmail('')
     
}},[inpval])


   

return(
    <Container 
        className='d-flex  justify-content-center align-items-center'
        style={{height: window.innerHeight -54 }}
    >
       <Card style={{width:600}} className='p-5'>
       {isLogin ? <>
                <h2 className="m-auto"> Login</h2>
                     <Form className ='d-flex flex-column'>
                        <Form.Control 
                            className='mt-3'
                            placeholder='Enter email or username'
                            value={inpval}
                            type='email'
                            onChange={e => setInpval(e.target.value)}
                            
                        />
                        <Form.Control 
                            className='mt-3'
                            placeholder='Enter Password'
                            value ={password}
                            onChange={e=> setPassword(e.target.value)}
                            type='password'
                        />
                    <Button className='mt-3' variant="danger"  onClick={click} >
                        Submit {}
                    </Button>
                    
                    </Form>
                    </>
                :
                <>
                <h2 className="m-auto"> Registration</h2>
                     <Form className ='d-flex flex-column'>
                     <Form.Control 
                            className='mt-3'
                            placeholder='Enter Username'
                            value ={username}
                            onChange={e=> setUsername(e.target.value)}
                        />
                        <Form.Control 
                            className='mt-3'
                            placeholder='Enter Email'
                            value ={email}
                            type="email"
                            onChange={e=> setEmail(e.target.value)}
                        />
                    <Form.Control 
                        className='mt-3'
                        placeholder='Enter Password'
                        type='password'
                        value ={password}
                        onChange={e=> setPassword(e.target.value)}
                    />
                    <Button className='mt-3' variant="danger" onClick={click}>
                        Register
                    </Button>
                    </Form>
                </>
                }

                <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                    {isLogin ?
                    <div>
                         <NavLink to={register_route}>Registration</NavLink>
                    </div>:
                    <div>
                    <NavLink to={login_route}>Login</NavLink>
                    </div>}
                </Row>
            
        </Card>
    </Container>
      )
})
export default Auth;