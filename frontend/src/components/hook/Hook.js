import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';


function store(field) {
    const[data,setData] = useState(['a','b','c']);

    useEffect(() => {
        fetch('/api/polling/' + props.match.params.field)
            .then(response => response.json())
            .then(data => {
                setData(data[0]);
            });
    }, []);




    return (
        <div className="store">


        </div>
    );
}

export default store;
