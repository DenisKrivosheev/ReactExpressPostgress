import React, { useEffect, useState } from 'react';
import { Col, Container, Image,  Button, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getDevice } from '../http/deviceApi';

const Devicepage = () =>{
    const [device, setDevice] = useState({info:[]})
    const {id} = useParams()
    
    useEffect(()=>{
        getDevice(id).then(data=> setDevice(data))
    },[])


    return(
    <Container className='mt-3'>
        <Col md={4}>
            <h2>{device.name}</h2>
            <div className='d-flex align-items-center justify-content-center'>Rating {device.rating}</div>
        </Col>
        <Col md={4}><Image width={300} height={300} src={ process.env.REACT_APP_API_URL + device.img }/></Col>
        <Col md={4} className="d-flex flex-column  justify-content-around">
            
                <h3>{device.price} UAH</h3>
                <Button variant="dark">Buy</Button>
            
        </Col>
        <Col md={4}><Row >
            <h1>Characteristics</h1>
            {device.info.map((info, index )=> 
            <Row style={{background:index %2 ===0? 'WhiteSmoke':'snow', padding:10}}>
                {info.title}: {info.desc}
            </Row>)}
            </Row></Col>
    </Container>
    )
}

export default Devicepage;