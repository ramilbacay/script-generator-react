import React from 'react';
import * as Yup from 'yup';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Bs from 'react-bootstrap';


const ValidForm = Yup.object().shape({
    user_id: Yup.string()
        .required('User ID is required.'),
    password: Yup.string()
        .required('Password is required.')
})

// class Login extends React.Component{
function Login(props){
    // render(){
        return(
            <>
            <Formik
                initialValues = {{
                    user_id: '',
                    password: '',
                }}
                enableReinitialize
                validationSchema = {ValidForm}
                onSubmit = {() =>{
                    fetch("http://10.15.10.250:8080/extract_dev2/login")
                    .then(result => result.json())
                    .then(
                        (result) => {
                            if(result){
                                window.history.pushState('','','/')
                                // alert("yay?")
                                
                            }
                        }
                    )
                }
                }
            >
                {
                    ({
                        props,
                        touched,
                        errors
                    }) => (
                        <Bs.Container className="mt-5">
                                        <Form>
                                            <Bs.Row className="justify-content-center">
                                                <Bs.Col md="4">
                                                    <Bs.Card>
                                                        <Bs.Card.Body>
                                                            <Bs.Card.Title className="text-center">
                                                                <h4>Login</h4>
                                                            </Bs.Card.Title>
                                                            <Bs.Row>
                                                                <Bs.Col md="12">
                                                                    <Bs.Form.Group>
                                                                        <Field 
                                                                            as={Bs.Form.Control} 
                                                                            type="text"
                                                                            id="user_id"
                                                                            name="user_id"
                                                                            placeholder="User ID"
                                                                            errors={errors.user_id}
                                                                            touched={`${touched.user_id}`}
                                                                            autoFocus={true}
                                                                        />
                                                                        {
                                                                            <Bs.Row>
                                                                                <Bs.Col md="12" className="text-danger">
                                                                                    <Bs.Form.Group>
                                                                                        <ErrorMessage name="user_id" />
                                                                                    </Bs.Form.Group>
                                                                                </Bs.Col>
                                                                            </Bs.Row>
                                                                        } 
                                                                    </Bs.Form.Group>
                                                                </Bs.Col>
                                                            </Bs.Row>
                                                            <Bs.Row>
                                                                <Bs.Col md="12">
                                                                    <Bs.Form.Group>
                                                                        <Field 
                                                                            as={Bs.Form.Control} 
                                                                            type="password"
                                                                            id="password"
                                                                            name="password"
                                                                            placeholder="Password"
                                                                            errors={errors.password}
                                                                            touched={`${touched.password}`}
                                                                        />
                                                                        {
                                                                            <Bs.Row>
                                                                                <Bs.Col md="12" className="text-danger">
                                                                                    <Bs.Form.Group>
                                                                                        <ErrorMessage name="password" />
                                                                                    </Bs.Form.Group>
                                                                                </Bs.Col>
                                                                            </Bs.Row>
                                                                        } 
                                                                    </Bs.Form.Group>
                                                                </Bs.Col>
                                                            </Bs.Row>
                                                            <Bs.Row className="justify-content-center">
                                                                <Bs.Col md="12" className="text-center">
                                                                    <Bs.Button type="submit" variant="outline-primary" size="lg">Login</Bs.Button>
                                                                </Bs.Col>
                                                            </Bs.Row>
                                            </Bs.Card.Body>
                                        </Bs.Card>
                                    </Bs.Col>
                                </Bs.Row>
                            </Form>
                        </Bs.Container>
                    )
                }
            </Formik>
            </>
        );
    // }
}


export default Login;