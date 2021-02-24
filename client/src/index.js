import React from 'react';
import ReactDOM from 'react-dom';
import MessageBoard from './views/MessageBoard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/">
          <MessageBoard />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
