import React, { useState } from "react";
import { Modal, Button, Form,} from "react-bootstrap";
import { createType } from "../../http/deviceApi";
const CreateType = ({show, onHide}) => {
     const [value, setValue] = useState('')  
     const addType =() => {
      createType({name: value}).then(data=>{
        setValue('')
        onHide()
      })
     }


  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create Type</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Form>
                <Form.Control 
                value = {value}
                onChange = {e => setValue(e.target.value)}
                placeholder = {'input new type name'}
                />
            </Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addType}>
            Close
          </Button>
          <Button variant="primary" onClick={addType}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateType