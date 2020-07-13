import React from 'react';
import '../App.css';
import {Container, Row, Table, ButtonToolbar} from 'react-bootstrap';
import OptionBtn from './TableComponents';
import {ReactModal} from './FormComponents';
// import ReactNavbar from './BsNavbar';


// const routes = [
//   {
//     name: 'Home',
//     route: '/'
//   },
//   {
//     name: 'Extract',
//     route: '/extract'
//   },
//   {
//     name: 'Files',
//     route: '/files'
//   }
// ];

class Files extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      files: [],
      alert_class: '',
      alert_heading: '',
      alert_body: '',
      alert_show: false
    };
    this.deleteBtnClickHandler = this.deleteBtnClickHandler.bind(this);
    this.filesChangeHandler = this.filesChangeHandler.bind(this);
    this.alertClose = this.alertClose.bind(this);
  }

  componentDidMount() {
    fetch("http://10.15.10.250:8080/extract_dev2/files")
    .then(res => res.json())
    .then(
        (result) => {
            this.setState({
                files: result
            });
        },
        (error) => {
            this.setState({
                error
            });
            console.log(this.state.error)
        }
    )
  }

  filesChangeHandler(){
    fetch("http://10.15.10.250:8080/extract_dev2/files")
    .then(res => res.json())
    .then(
        (result) => {
            this.setState({
              files: result
            });
        },
        (error) => {
            this.setState({
                error
            });
            // console.log(this.state.error)
        }
    )
  }

  alertClose(){
    this.setState({
        alert_show: false
    });
  }

  downloadBtnClickHandler(file){
    setTimeout(() => {
      const response = {
        file: "http://10.15.10.250:8080/extract_dev2/download/"+ file,
      };
      window.location.href = response.file;
    }, 100);
  }

  // setTimeout(() => {
  //   fetch("http://10.15.10.250:8080/extract_dev2/files")
  //   .then(res => res.json())
  //   .then(
  //       (result) => {
  //           this.setState({
  //             files: result
  //           });
  //       },
  //       (error) => {
  //           this.setState({
  //               error
  //           });
  //           // console.log(this.state.error)
  //       }
  //   )
  //   }, 100);
  // }

  deleteBtnClickHandler(file){
    fetch("http://10.15.10.250:8080/extract_dev2/delete/"+file)
    .then(res => res.json())
    .then(
        (result) => {
            if(result['error']){
              this.setState({
                alert_show: true,
                alert_class: 'alert-danger',
                alert_heading: 'Error',
                alert_body: result['data']
              });
            }
            else{
              this.setState({
                alert_show: true,
                alert_class: 'alert-success',
                alert_heading: 'Success',
                alert_body: result['data']
              });
              this.filesChangeHandler();
            }
        },
        (error) => {
            this.setState({
                error
            });
        }
    )
  }

  render() {
    return(
      <>
        {/* <ReactNavbar routes={routes} /> */}
        <ReactModal
            display={this.state.alert_show}
            class={this.state.alert_class} 
            title={this.state.alert_heading} 
            body={this.state.alert_body} 
            onClose={this.alertClose}
        />
        <Container className="mt-5 mb-5 border pt-5 pb-5">
            {/* <Card className="padding-0">
              <Card.Body> */}
                <Row className="justify-content-md-center">
                  {/* <Card.Title>Extracted Workflow Scripts</Card.Title> */}
                  <h5>Extracted Workflow Scripts</h5>
                </Row>
                <Row className="justify-content-md-center">
                  <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>Filename</th>
                        <th className="text-center">Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.files.map((value, index) => (
                          <tr key={index}>
                            <td>{value}</td>
                            <td className="text-center">
                              <ButtonToolbar>
                                <OptionBtn use={1} onClick={() => this.downloadBtnClickHandler(value)} />
                                <OptionBtn use={2} onClick={() => this.deleteBtnClickHandler(value)} />
                              </ButtonToolbar>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </Row>
              {/* </Card.Body>
            </Card> */}
        </Container>
      </>
    );
  }
}
  
  export default Files;