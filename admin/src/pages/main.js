import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './Login'
import LayoutBase from './Layout';
function Main(){
    return (
        <Router>
            <Route path="/" exact component={Login} />
            <Route path="/index/" component={LayoutBase} />
            
        </Router>
    )
}
export default Main