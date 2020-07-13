import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/Content';
import { HashRouter } from "react-router-dom";
import ReactNavbar from './components/BsNavbar';

// function App(){
//   const [isAuthenticated, userHasAuthenticated] = useState(false);
//   return(
//     <>
//       <BrowserRouter>
//         <Switch>
//           <Route exact path="/login" component={Login} />
//           <Content />
//         </Switch>
//       </BrowserRouter>
//     </>
//   );
// }
const routes = [
  {
      name: 'Home',
      route: '/'
  },
  {
      name: 'Extract',
      route: '/extract'
  },
  {
      name: 'Files',
      route: '/files'
  }
];

class App extends React.Component{

  render() {
    return(
      <>
        <HashRouter>
            <ReactNavbar routes={routes} />
            <Content />
        </HashRouter>
      </>
    );
  }
}

export default App;
