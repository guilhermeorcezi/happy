import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateOrphanage from '../pages/CreateOrphanage';

import Landing from '../pages/Landing';
import Map from '../pages/Map';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/find" exact component={Map} />
      <Route path="/create" exact component={CreateOrphanage} />
    </Switch>
  );
};

export default Routes;
