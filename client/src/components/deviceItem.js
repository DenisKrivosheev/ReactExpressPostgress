import React from "react";
import { Card, Col, Image} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {device_route} from "../utils/const"


const Deviceitem = ({device}) => {
    const history = useNavigate()
    
    const style={
        backgroundColor : 'Fuchsia'
    }


    return(
        <Col md={3} className="mt-3" onClick={()=> history(device_route + '/'+ device.id )}  >
           <Card style={{width : 150, cursor: 'pointer'}} style={style} border={"#ADFF2F"}>
            <Image width={150} height={150} src={process.env.REACT_APP_API_URL  + device.img}/><br/>
            <div className="mt-1 d-flex justify-content-between align-items-center">
                <div className="d-flex alighn-items-center">
                    <div>{device.rating}</div>
                </div>
            </div>
            <div>{device.name}</div>
           </Card>
        </Col>
    )
}

export default Deviceitem;