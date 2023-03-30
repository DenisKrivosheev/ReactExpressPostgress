import React, { useContext } from "react";
import { Context } from "..";
import { Row} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import Deviceitem from "./deviceItem";



const DeviceList = observer(() => {
    const {device} = useContext(Context)
    return(
        <Row className="d-flex" >
            
            {device.devices.map(device=>
           <Deviceitem key={device.id}  device={device}/>
           
            ) }
         
        </Row>
    )
})

export default DeviceList;