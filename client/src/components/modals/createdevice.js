import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap";
import { Context } from "../..";
import { createDevice } from "../../http/deviceApi";
import { getBrands, getTypes } from "../../http/deviceApi";

const Createdevice = observer(({show, onHide}) => {
    const{device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const[info, setInfo] = useState([])

    useEffect(() => {
      getTypes().then(data => device.setTypes(data))
      getBrands().then(data => device.setBrands(data))
    }, [])

    const addinfo = () =>{
        setInfo([...info, {title: '', desc:'', number:Date.now()}])
    }
    const reminfo = (number) =>{
        setInfo(info.filter(i=> i.number !== number))
    }
    const changeInfo = (key, value, number) => {
      setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const selectFile = e => {
      setFile(e.target.files[0])
  }
  const addDevice = () => {
    const formData = new FormData()
    try{
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then( onHide())
    }catch(e){alert(e)}
}
  return (
    
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create  Device</Modal.Title>
      </Modal.Header>
        <Modal.Body>
            <Form>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{ device.selectedType.name ||'Choose Type'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                      {device.types.map(type =>
                        <Dropdown.Item 
                        onClick={() => device.setSelectedType(type)}
                        key={type.id}
                        >{type.name}
                        </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{ device.selectedBrand.name || 'Choose Brand'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                      {device.brands.map(brand =>
                        <Dropdown.Item 
                        onClick={()=>device.setSelectedBrand(brand)}
                        key={brand.id}
                        >
                          {brand.name}
                        </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-3"
                  placeholder="Input Device Name"/>
                <Form.Control 
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="mt-3"
                  placeholder="Input Price" 
                  type='number'
                  />
                <Form.Control 
                  className="mt-3"
                  placeholder="Load Device Photo" 
                  type="file"
                  onChange={selectFile}
                  />
                <Button
                  onClick={addinfo}
                >
                  new property
                </Button> 
                {info.map(i=>
                    <Row className="mt-3" key={i.number}>
                    <Col md={4}>
                        <Form.Control 
                        value={i.title}
                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                        placeholder="Input name"/>
                    </Col>
                    <Col md={4}>
                    <Form.Control
                      value={i.description}
                      onChange={(e) => changeInfo('description', e.target.value, i.number)}
                      placeholder="Input new description"/>
                    </Col>
                    <Col md={4}>
                    <Button
                      onClick={()=> reminfo(i.number)}
                    >
                        Delete</Button>
                    </Col>
                    </Row>
                    )}                
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={addDevice}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
  );
})

export default Createdevice