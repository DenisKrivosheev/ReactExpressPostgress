import React,{useContext, useEffect} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Brands from '../components/brands';
import TypeBar from '../components/Typebar';
import DeviceList from '../components/deviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { getTypes, getBrands, getDevices} from '../http/deviceApi';
import Pages from "../components/Pages";


const Shop = observer(() =>{
    const {device} = useContext(Context)
    useEffect(()=> {
        getTypes().then(data => device.setTypes(data))
        getBrands().then(data => device.setBrands(data))
        getDevices(null, null, 1, 5).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)})
            console.log(device)
        
      },[])
      
      useEffect(() => {
        getDevices(device.selectedType.id, device.selectedBrand.id, device.page, 6).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand,])



    return(
    <Container >
        <Row >
            <Col md={3} >
                <TypeBar/>
            </Col>
            <Col md={9}>
                <Brands/>
                <DeviceList/>
                <Pages/>
            </Col>
        </Row>
    </Container>
    );
});

export default Shop;