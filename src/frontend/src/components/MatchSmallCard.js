import React from 'react'
import { Link } from 'react-router-dom'
import './MatchSmallCard.scss'

const MatchSmallCard = ({ teamName, match }) => {
    const otherTeam = teamName === match.team1 ? match.team2 : match.team1;
    const isMatchWon = teamName === match.matchWinner;

    return (
        <div className={`MatchSmallCard ${isMatchWon ? 'won-card' : 'lost-card'}`}>
            <span className="vs">vs</span>
            <h1><Link to={`/teams/${otherTeam}`}>{otherTeam}</Link></h1>
            <p className="match-result">{match.matchWinner} won by {match.resultMargin} {match.result}</p>
        </div>
    )
}

export default MatchSmallCard
