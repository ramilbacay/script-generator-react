import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Bs from 'react-bootstrap';
import {FaPlus, FaMinus, FaLightbulb} from 'react-icons/fa';
import { useField, Field, FieldArray, ErrorMessage  } from 'formik';
import '../App.css';

function ReactTip(props){
    return(
        <Bs.Collapse in={props.display}>
            <div>
                <Bs.Alert variant={props.variant} onClose={props.onClose} dismissible>
                    <FaLightbulb /> Tip: For multiple inputs, you can press <kbd>Tab</kbd> while focused on a text box to automatically add a new row.
                </Bs.Alert>
            </div>
        </Bs.Collapse>
    );
}

function ReactModal(props){
    // console.log(props.display);
    // const [show, setShow] = useState(props.display);
    if (props.display) {
        return(
            <Bs.Modal show={props.display} onHide={() => props.onClose()}>
                <Bs.Modal.Header className={props.class} closeButton>
                    <Bs.Modal.Title>{props.title}</Bs.Modal.Title>
                </Bs.Modal.Header>
                <Bs.Modal.Body className={props.class}>
                    {props.body}    
                </Bs.Modal.Body>
            </Bs.Modal>
        );
    }
    return null;
}

function InputWithLabel(props){
    return(
        <>
            <Bs.Col md="6">
                <Bs.Form.Group>
                    <FormLabel label={props.label} />
                    <Field 
                        as={props.comp} 
                        type={props.type}
                        id={props.id}
                        name={props.name}
                        placeholder={props.placeholder}
                    />
                    <div className="text-danger">
                        <ErrorMessage name={props.name} />
                    </div>
                </Bs.Form.Group>
            </Bs.Col>
        </>
    );
}

function BasicInput(props){
    return(
        <>
            <Bs.Col md="6">
                <Bs.Form.Group>
                    <Field 
                        as={props.comp} 
                        type={props.type}
                        id={props.id}
                        name={props.name}
                        placeholder={props.placeholder}
                        onKeyDown={props.onKeyDown}
                        autoFocus={true}
                    />
                    {
                        typeof props.errors === 'string' ?
                            null
                        :
                            <Bs.Row>
                                <Bs.Col md="12" className="text-danger">
                                    <Bs.Form.Group>
                                        <ErrorMessage name={props.name} />
                                    </Bs.Form.Group>
                                </Bs.Col>
                            </Bs.Row>
                    }
                    
                </Bs.Form.Group>
            </Bs.Col>
        </>
    );
}

function SideButton(props){
    var icon = "";
    var variant = "";
    if(props.use === "add"){
        icon = <FaPlus />;
        variant = "outline-primary";
    }
    else{
        icon = <FaMinus />;
        variant = "outline-danger";
    }
    return(
        <>
            <Bs.Col md={props.col}>
                <Bs.Form.Group>
                    <Bs.Button 
                        variant={variant} 
                        className="btn-circle" 
                        onClick={props.onClick}
                    >
                        {icon}
                    </Bs.Button>
                </Bs.Form.Group>
            </Bs.Col>
        </>
    );
}

function FormButton(props){
    return(
        <>
            <Bs.Col md={props.col}>
                <Bs.Form.Group>
                    <Bs.Button 
                        variant="outline-primary" 
                        size={props.size} 
                        type={props.type} 
                        onClick={props.onClick}
                    >
                        {props.text}
                    </Bs.Button>
                </Bs.Form.Group>
            </Bs.Col>
        </>
    );
}

function RegularButton(props){
    const isSubmitting = props.isSubmitting ? true : false;
    var className = "mx-auto text-center";
    if(props.type !== "submit"){
        className = "";
    }

    return(
        <>
            <Bs.Col md={props.col} className={className}>
                <Bs.Form.Group>
                    <Bs.Button 
                        variant="outline-primary" 
                        size={props.size} 
                        type={props.type} 
                        disabled={isSubmitting}
                        onClick={props.onClick}
                    >
                        {props.text}
                    </Bs.Button>
                </Bs.Form.Group>
            </Bs.Col>
        </>
    );
}

function ReactSwitch(props){
    const [ field, meta, helpers] = useField(props.name);
    const { value } = meta;
    const { setValue } = helpers;
    return(
        <>
            <Bs.Row>
                <Bs.Col md={props.col}>
                    <Bs.Form.Group>
                        <Bs.Form.Check 
                            type="switch"
                            id={props.id}
                            name={props.name}
                            label={props.label}
                            checked={value}
                            onChange={() => setValue(!value)}
                        />
                    </Bs.Form.Group>
                </Bs.Col>
            </Bs.Row>
        </>
    );
}

function ConditionInput(props){

    if(props.show){
        return(
            <> 
                <Bs.Row>
                    <InputWithLabel
                        comp={Bs.Form.Control}
                        type={props.type}
                        id={props.id}
                        name={props.name}
                        placeholder={props.placeholder}
                        label={props.label}
                    />
                </Bs.Row>
            </>
        );
    }
        return null;
}

function FormLabel(props){
    return(
        <Bs.Form.Label>{props.label}</Bs.Form.Label>
    );
}

class MultipleInput extends React.Component{
    constructor(props){
        super(props);
        this.handleTabPress = this.handleTabPress.bind(this);
    }

    handleTabPress = (data, event) =>{    
        if(event.keyCode === 9){
            data.push('');
        }
    }
    
    render(){
        if(this.props.show){
            return(
                <>
                    <FieldArray
                        name={this.props.name}
                        render={
                            arrayHelpers => (
                                <div>
                                    <FormLabel label={this.props.label} />
                                    {
                                        
                                        this.props.value && this.props.value.length > 0 ? (
                                            this.props.value.map((value, index) => (
                                                <Bs.Row key={index}>
                                                        <Field 
                                                            as={BasicInput} 
                                                            comp={Bs.Form.Control} 
                                                            name={`${this.props.name}.${index}`} 
                                                            placeholder={this.props.placeholder}
                                                            parent={this.props.name}
                                                            errors={this.props.errors}
                                                            onKeyDown={(e) => this.handleTabPress(this.props.value, e)}
                                                            autoFocus={true}
                                                        />
                                                        <SideButton
                                                            col="1"
                                                            use="subtract"
                                                            onClick={() => arrayHelpers.remove(index)} 
                                                        />
                                                        <SideButton
                                                            col="1"
                                                            use="add"
                                                            onClick={() => arrayHelpers.push('')}
                                                        />
                                                </Bs.Row>
                                            ))
                                        ) : 
                                        (
                                            <Bs.Row>
                                                <FormButton 
                                                    type="button" 
                                                    size="small" 
                                                    onClick={() => arrayHelpers.push('')} 
                                                    text={this.props.button}
                                                    name={this.props.name}
                                                    errors={this.props.errors}
                                                /> 
                                            </Bs.Row>
                                        )
                                    }
                                    {
                                        typeof this.props.errors === 'string' ?
                                            <Bs.Row>
                                                <Bs.Col md="6" className="text-danger">
                                                    <Bs.Form.Group>
                                                        <ErrorMessage name={this.props.name} />
                                                    </Bs.Form.Group>
                                                </Bs.Col>
                                            </Bs.Row>
                                        :
                                            null
                                    }
                                </div>
                            )
                        }
                    />
                </>
            );
        }
        return null;
    }
}

export  {
    BasicInput,
    SideButton,
    RegularButton,
    ReactSwitch,
    MultipleInput,
    FormLabel,
    InputWithLabel,
    ConditionInput,
    ReactModal,
    ReactTip
};