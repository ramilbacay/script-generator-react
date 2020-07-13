import React from 'react';
import cat from '../cat.jpg';
import {Container, Row, Image} from 'react-bootstrap';
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

class Home extends React.Component{

  render() {
    return(
      <>
      {/* <ReactNavbar routes={routes} /> */}
      <Container className="mt-5 mb-5">
          <Row className="justify-content-md-center">
            <h6>Go ahead</h6>
          </Row>
          <Row className="justify-content-md-center">
            <Image src={cat} fluid />
          </Row>
      </Container>
      </>
    );
  }
}

// function Home(){
//   return(
//     <>  
//         <ReactNavbar routes={routes} />
//         <Container className="mt-5 mb-5">
//           <Row className="justify-content-md-center">
//             <h6>Go ahead</h6>
//           </Row>
//           <Row className="justify-content-md-center">
//             <Image src={cat} fluid />
//           </Row>
//         </Container>
//     </>
//   );
// }
  
export default Home;