import React, {useState} from 'react';

import {Form,Button,Collapse,Card} from "react-bootstrap";
import {useForm} from 'react-hook-form';
import './Searchdrop.css';



function SearchDrop(props) {
    const{register,getValues} = useForm();
    const [isHidden,setHide] = useState(false);
    const toggle = () => setHide(!isHidden);
    const [data,setData] = useState(props.values)
    const[filterData,setFilterData] = useState([])
    function handleChange(e){
        var newData = data.filter(word => e.target.value === word);
        setFilterData(newData);


    }

    return (
        <div className="searchdrop">

            <Form.Group>
                <Form.Control size="lg" type="text" placeholder="Select a location" onChange={handleChange} />

                <div  >
                    {
                        filterData.map(place => (
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