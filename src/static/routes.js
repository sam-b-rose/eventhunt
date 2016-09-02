import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import { HomeView, NotFoundView } from './containers';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={HomeView}/>
        <Route path="*" component={NotFoundView}/>
    </Route>
);
