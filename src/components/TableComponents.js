import React from 'react';
import Button from 'react-bootstrap/Button';
import {FaDownload, FaTrashAlt} from 'react-icons/fa';
import '../App.css';


function OptionBtn(props){
    if(props.use === 1){
        return(
            <>
                <Button className="btn-circle" variant="outline-light" onClick={props.onClick}><FaDownload /></Button>
            </>
        );
    }
    else if(props.use === 2){
        return(
            <>
                <Button className="btn-circle" variant="outline-danger" onClick={props.onClick}><FaTrashAlt /></Button>
            </>
        );
    }
    return null;
}

export default OptionBtn;