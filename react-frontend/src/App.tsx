import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

const App: React.FC = () => {
  return (
    <Router location={''} navigator={undefined}>
      <Switch>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <PrivateRoute path="/protected">
          {/* Component for protected route */}
        </PrivateRoute>
        {/* Other routes */}
      </Switch>
    </Router>
  );
};

export default App
