import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from "react-router-dom";
import Extract from "./Extract";
import Home from "./Home";
import Files from "./Files";
// import ReactNavbar from './BsNavbar';

// const routes = [
//     {
//         name: 'Home',
//         route: '/'
//     },
//     {
//         name: 'Extract',
//         route: '/extract'
//     },
//     {
//         name: 'Files',
//         route: '/files'
//     }
// ];

function Content(){
    return(
        <>
            <Route exact path="/" component={Home}/>
            <Route exact path="/extract" component={Extract} />
            <Route exact path="/files" component={Files} />
        </>
    );
}

// class Content extends React.Component{

//     render(){
//         const { component: Component, pending, logged } = this.props
//         return(

//         );
//     }
// }

export default Content;