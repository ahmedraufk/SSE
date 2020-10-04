import React from 'react';

import {Form} from "react-bootstrap";
import './Searchdrop.css';


function SearchDrop() {

    return (
        <div className="searchdrop">

            <Form.Group>
                <Form.Control size="lg" type="text" placeholder="Select a location" />

                <br />

            </Form.Group>
        </div>
    );
}

export default SearchDrop;