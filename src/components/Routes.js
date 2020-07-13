import React from 'react';
import { Switch } from "react-router-dom";
import Home from './Home';
import Extract from './Extract';
import Files from './Files';
import Login from './Login';
import AppliedRoute from './AppliedRoute';

// import { Switch } from 'react-dom';

// export default function Routes({ appProps }) {
//     return (
//       <Switch>
//         <AppliedRoute path="/" exact component={Home} appProps={appProps} />
//         <AppliedRoute path="/extract" exact component={Extract} appProps={appProps} />
//         <AppliedRoute path="/files" exact component={Files} appProps={appProps} />
//         <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
//         { /* Finally, catch all unmatched routes */ }
//         {/* <Route component={NotFound} /> */}
//       </Switch>
//     );
//   }

function Routes(appProps) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />
            <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
            <AppliedRoute path="/extract" exact component={Extract} appProps={appProps} />
            <AppliedRoute path="/files" exact component={Files} appProps={appProps} />
        </Switch>
    );
}

export default Routes;