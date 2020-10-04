import React, {useState} from 'react';

import {Form,Button,Collapse,Card} from "react-bootstrap";
import {useForm} from 'react-hook-form';
import './Searchdrop.css';



function SearchDrop(props) {
    const{register,getValues} = useForm();
    const [isHidden,setHide] = useState(false);
    const toggle = () => setHide(!isHidden);



    return (
        <div className="searchdrop">

            <Form.Group>
                <Form.Control size="lg" type="text" placeholder="Select a location" />
                <div  >

                    {
                        props.values.map(place => (
                            <p>
                                {place}
                            </p>
                        ))
                    }

                </div>
                <br />
                <Button variant="primary" onClick= {toggle}>Search</Button>
            </Form.Group>


        </div>
    );
}

export default SearchDrop;