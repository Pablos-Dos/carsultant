import React from 'react';
import EventList from './containers/EventListView';
import EventDetail from './containers/EventDetailView';
import {Route} from 'react-router-dom';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={EventList} />
        <Route exact path='/:eventID' component={EventDetail} />
    </div>
);

export default BaseRouter