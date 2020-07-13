import React from 'react';
import { Form, Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Bs from 'react-bootstrap';
import * as Yup from 'yup';

import { RegularButton, MultipleInput, InputWithLabel, ReactSwitch, ReactModal, ReactTip} from './FormComponents';


const ValidForm = Yup.object().shape({
        reqst_cd: Yup.string()
            .required('Request code is required.'),
        workflows: Yup.array()
            .of(
                Yup.string()
                .required('Workflow code is required.'),
            )
            .min(1, 'Minimum of 1 workflow.'),
        clusters: Yup.array()
            .of(
                Yup.string()
                .required('Cluster code is required.')
            ),
        cluster_apvls: Yup.array()
            .of(
                Yup.string()
                .required('Cluster Approval code is required.')
            ),
        dropdowns: Yup.array()
            .of(
                Yup.string()
                .required('Field Name is required.')
            ),
        // apps_cd: Yup.string(),
        // apps_owners: Yup.array()
        // .of(
        //     Yup.string()
        //     .required('Application Owner is required.'),
        // )
        // .when('apps_cd', {
        //     is: (apps_cd) => apps_cd > '',
        //     then: Yup.array()
        //         .min(1, 'Minimum of 1 Application Owner.'),          
        // }),
        reqst_cond_switch: Yup.boolean(),
        condtn_cd: Yup.array()
            .when('reqst_cond_switch', {
                is: (reqst_cond_switch) => reqst_cond_switch === true,
                then: Yup.array()
                .of(
                    Yup.string()
                    .required('Condition code is required.'),
                )
                .min(1, 'Minimum of 1 condition.'),
            })
            
        
});

class ReactCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          users: [],
          alert_class: '',
          alert_heading: '',
          alert_body: '',
          alert_show: false,
          tip_show: true
        };

        // this.appsCdChangeHandler = this.appsCdChangeHandler.bind(this);
        this.alertClose = this.alertClose.bind(this);
        this.tipClose = this.tipClose.bind(this);
    }

    componentDidMount() {
        // fetch("http://10.15.10.250:8080/extract_dev2/users")
        // .then(res => res.json())
        // .then(
        //     (result) => {
                // console.log(result)
                // this.setState({
                    // users: result
                    // isLoaded: true,
                    // selectedOption: "Please choose"
                // });
        //     },
        //     (error) => {
        //         this.setState({
        //             error
        //         });
        //         console.log(this.state.error)
        //     }
        // )

    }

    // clusterApvlSwitchChangeHandler(){
    //     var new_wflow = this.state.other_wflow.concat('');
    //     this.setState({ other_wflow: new_wflow });
    // }

    alertClose(){
        this.setState({
            alert_show: false
        });
    }

    tipClose(){
        this.setState({
            tip_show: false
        })
    }

    render(){
    return(
        <>
        <ReactModal 
            display={this.state.alert_show}
            class={this.state.alert_class} 
            title={this.state.alert_heading} 
            body={this.state.alert_body} 
            onClose={this.alertClose}
        />
        <ReactTip variant="primary" display={this.state.tip_show} onClose={this.tipClose} />
        <Formik
            initialValues={{ 
                users: this.state.users,
                reqst_cd: '',
                workflows: [],
                cluster_switch: false,
                clusters: [],
                cluster_apvls: [],
                dropdowns: [],
                apps_cd: '',
                // apps_owners: [],
                wflow_cond_switch: false,
                reqst_cond_switch: false,
                condtn_cd: [],
                cond_ctrls_switch: false,
                form_validate_switch: false,
                ws_apvl_switch: false,
                ws_actv_switch: false
            }}
            enableReinitialize
            validationSchema={ValidForm}
            onSubmit={( values, { setSubmitting, resetForm }) =>{

                    const that = this;

                    fetch("http://10.15.10.250:8080/extract_dev2/extract_workflow", {
                            method: 'POST',
                            mode: 'cors',
                            body: JSON.stringify(values, null, 2)
                        }
                    )
                        .then(handleResponse)
                        .then(data => {
                                if(data['error']){
                                    that.setState({
                                        alert_show: true,
                                        alert_class: 'alert-danger',
                                        alert_heading: 'Error',
                                        alert_body: data['data']
                                    });
                                    setSubmitting(false);
                                }
                                else{
                                    setSubmitting(false);
                                    resetForm(values);
                                    that.setState({
                                        alert_show: true,
                                        alert_class: 'alert-success',
                                        alert_heading: 'Workflow Extracted',
                                        alert_body: 'Script for transport has been extracted. Please check the files for the script and rollback.'
                                    });
                                }
                                
                            }
                        )
                        .catch(error => {
                            that.setState({
                                error
                            });
                            that.setState({
                                alert_show: true,
                                alert_class: 'alert-danger',
                                alert_heading: 'Error',
                                alert_body: 'There was an error processing your request. Please try again or contact your system administrator. Error: ' + error.statusText
                            });
                            console.log(error.err);
                            setSubmitting(false);
                        })
                    function handleResponse (response) {
                        let contentType = response.headers.get('content-type')
                        if (contentType.includes('application/json')) {
                            return handleJSONResponse(response)
                        } else if (contentType.includes('text/html')) {
                            return handleTextResponse(response)
                        } else {
                            // Other response types as necessary. I haven't found a need for them yet though.
                            throw new Error(`Sorry, content-type ${contentType} not supported`)
                        }
                    }

                    function handleJSONResponse (response) {
                        return response.json()
                        .then(json => {
                            if (response.ok) {
                                return json
                            } else {
                                return Promise.reject(Object.assign({}, json, {
                                status: response.status,
                                statusText: response.statusText
                                }))
                            }
                        })
                    }
                    function handleTextResponse (response) {
                        return response.text()
                        .then(text => {
                            if (response.ok) {
                                return text
                            } else {
                                return Promise.reject({
                                status: response.status,
                                statusText: response.statusText,
                                err: text
                                })
                            }
                        })
                    }
                }
            }
        >
            {({ 
                values,
                touched,
                errors,
                isSubmitting
            }) => (
                
                <Form>
                    <Bs.Row>
                        <InputWithLabel
                            comp={Bs.Form.Control}
                            type="text"
                            id="reqst_cd"
                            name="reqst_cd"
                            placeholder="Request Code"
                            label="Request Code"
                            errors={errors.reqst_cd}
                            touched={touched.reqst_cd}
                        />
                    </Bs.Row>
                    <Bs.Row>
                        <Bs.Col md="12">
                            <MultipleInput 
                                show={true}
                                value={values.workflows} 
                                errors={errors.workflows} 
                                touched={touched.workflows} 
                                name="workflows" 
                                item="workflow" 
                                placeholder="Workflow Code" 
                                button="Add Workflow" 
                                label="Workflow" 
                            />
                        </Bs.Col>
                    </Bs.Row>
                   
                    {/* <ReactSwitch label="With Cluster?" name="cluster_switch" id="cluster_switch" col="5" /> */}
                    <Bs.Row>
                        <Bs.Col md="6">
                            <MultipleInput 
                                show={true}
                                value={values.clusters} 
                                errors={errors.clusters} 
                                touched={touched.clusters} 
                                name="clusters" 
                                item="cluster" 
                                placeholder="Cluster Code" 
                                button="Add Cluster" 
                                label="Cluster" 
                                keydown={(e) => this.handleTabPress(values.clusters , e)}
                            />
                        </Bs.Col>
                        <Bs.Col md="6">
                            <MultipleInput 
                                show={true}
                                value={values.cluster_apvls} 
                                errors={errors.cluster_apvls} 
                                touched={touched.cluster_apvls} 
                                name="cluster_apvls" 
                                item="cluster_apvls" 
                                placeholder="Cluster Approval Code" 
                                button="Add Cluster Approver" 
                                label="Cluster Approval" 
                                keydown={(e) => this.handleTabPress(values.cluster_apvls , e)}
                            />
                        </Bs.Col>
                    </Bs.Row>
                    
                    <Bs.Row>
                        <Bs.Col md="6">
                            <MultipleInput 
                                show={true}
                                value={values.dropdowns} 
                                errors={errors.dropdowns} 
                                touched={touched.dropdowns} 
                                name="dropdowns" 
                                item="dropdowns" 
                                placeholder="Field Name" 
                                button="Add Dropdown" 
                                label="Dropdown" 
                                keydown={(e) => this.handleTabPress(values.dropdowns , e)}
                            />
                        </Bs.Col>
                    </Bs.Row>
                    
                    <Bs.Row>
                        <InputWithLabel
                            comp={Bs.Form.Control}
                            type="text"
                            id="apps_cd"
                            name="apps_cd"
                            placeholder="Application Code"
                            label="Application Code"
                            errors={errors.apps_cd}
                            touched={touched.apps_cd}
                        />
                    </Bs.Row>
                    {/* <MultipleInput 
                        value={values.apps_owners} 
                        name="apps_owners" 
                        item="apps_owners" 
                        placeholder="Application Owner" 
                        button="Add Application Owner" 
                        label="Application Owner" 
                        errors={errors.apps_owners}
                    /> */}
                    <ReactSwitch
                        id="wflow_cond_switch"
                        name="wflow_cond_switch"
                        label="With workflow condition?"
                    />
                    <ReactSwitch
                        id="reqst_cond_switch"
                        name="reqst_cond_switch"
                        label="With request condition?"
                    />
                    <MultipleInput 
                        show={values.reqst_cond_switch}
                        value={values.condtn_cd} 
                        errors={errors.condtn_cd} 
                        touched={touched.condtn_cd} 
                        name="condtn_cd" 
                        item="dropdowns" 
                        placeholder="Condition Code" 
                        button="Add Condition" 
                        label="Condition Code" 
                        keydown={(e) => this.handleTabPress(values.condtn_cd , e)}
                    />
                    <ReactSwitch
                        id="cond_ctrls_switch"
                        name="cond_ctrls_switch"
                        label="With conditional control?"
                    />
                    <ReactSwitch
                        id="form_validate_switch"
                        name="form_validate_switch"
                        label="With trigger on Save/Finalize?"
                    />
                    <ReactSwitch
                        id="ws_apvl_switch"
                        name="ws_apvl_switch"
                        label="With trigger on approval?"
                    />
                    <ReactSwitch
                        id="ws_actv_switch"
                        name="ws_actv_switch"
                        label="With trigger when an activity is done?"
                    />


                    <RegularButton 
                        col="5" 
                        type="submit" 
                        size="lg" 
                        text="Extract" 
                        isSubmitting={isSubmitting} 
                    />
                </Form>
            )}
        </Formik>
        </>
    );}
};

export default ReactCard;