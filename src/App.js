import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Main from './pages/Main';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from './components/NavBar';
import { WeightProvider } from './contexts/WeightContext';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <WeightProvider>
            <NavBar />
            <Switch>
              <PrivateRoute exact path="/" component={Main} />
              <Route path="/login" component={Login} />
              <Redirect to="/" />
            </Switch>
          </WeightProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
