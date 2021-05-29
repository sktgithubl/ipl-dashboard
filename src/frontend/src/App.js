import './App.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { TeamPage } from './pages/TeamPage';
import MatchPage from './pages/MatchPage';
import HomePage from './pages/HomePage';
import TwoTeamStatsPage from './pages/TwoTeamStatsPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path="/team1vsteam2">
            <TwoTeamStatsPage />
          </Route>
          <Route exact path='/teams/:teamName'>
            <TeamPage />
          </Route>
          <Route path='/teams/:teamName/matches/:year'>
            <MatchPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
