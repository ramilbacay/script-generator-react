import React, {useState} from 'react';
import ReactCard from './MainCard';
import ReportsCard from './ReportsCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import '../App.css';
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

function Extract (){
  
  const [key, setKey] = useState('workflow');

  return(
    <>
      {/* <ReactNavbar routes={routes} /> */}
      <Container className="mt-5 mb-5">
        <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
          <Tab eventKey="workflow" title="Workflow">
            <Card className="border-top-0 border border-rad-0">
              <Card.Body>
                <ReactCard />
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="report" title="Report">
            <Card className="border-top-0 border border-rad-0">
              <Card.Body>
                <ReportsCard />
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}
  
export default Extract;