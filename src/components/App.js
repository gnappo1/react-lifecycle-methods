import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import QuizContainer from "../containers/QuizContainer"
import Navbar from "./Navbar"
import Home from "./Home"
import FutureGameList from "./FutureGameList"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} /> 
          <Route path="/play" render={routeProps => <QuizContainer {...routeProps}/>}/> 
          <Route path="/future-games" render={routeProps => <FutureGameList {...routeProps}/>}/> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
