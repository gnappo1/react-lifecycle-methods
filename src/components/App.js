import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import QuizContainer from "../containers/QuizContainer"

function App() {
  return (
    <div className="App">
      <QuizContainer />
    </div>
  );
}

export default App;
