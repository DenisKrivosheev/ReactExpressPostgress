import React, { useState } from "react";
import { Modal, Button, Form} from "react-bootstrap";
import { createBrand } from "../../http/deviceApi";

const CreateBrand = ({show, onHide}) => {
  const [value, setValue] = useState('')

  const addBrand = () => {
      createBrand({name: value}).then(data => {
          setValue('')
          onHide()
      })
  }
  return (
    <>
      

      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
              <Form.Control 
               value={value}
               onChange={e => setValue(e.target.value)}
               placeholder={"enter brand name"}
              />  
            </Form>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={addBrand}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateBrand