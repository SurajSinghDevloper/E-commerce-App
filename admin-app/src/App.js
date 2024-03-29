import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions';

function App() {
  const auth = useSelector(state => state.auth);


  const dispatch = useDispatch()

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [])


  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />

          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
