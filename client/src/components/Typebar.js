import React, { useContext } from "react";
import { Context } from "..";
import {ListGroup, } from 'react-bootstrap'


import {observer} from 'mobx-react-lite'


const style = {
    cursor : 'pointer',
      
    borderColor : '#ADFF2F',
    background : 'Fuchsia', 
    borderButtomLeftRadius : '10'

}

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return(
        <ListGroup>
            {device.types.map(type =>
                <ListGroup.Item
                style={style}
                active = {type.id === device.selectedType.id} 
                onClick={() => device.setSelectedType(type)}
                key={type.id}
                >
                    {type.name}
                </ListGroup.Item>)}
        </ListGroup>
    )
})

export default TypeBar;