 
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Principal from './pages/Principal';

export default function Routes(){

    return (
        <BrowserRouter>
            <Switch>
              <Route path = "/" exact component = {Principal}/>
            </Switch>
        </BrowserRouter>
    );
}
