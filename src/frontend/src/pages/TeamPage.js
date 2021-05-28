import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { Link, useParams } from 'react-router-dom'
import MatchDetailCard from '../components/MatchDetailCard'
import MatchSmallCard from '../components/MatchSmallCard'

import './TeamPage.scss';

export const TeamPage = () => {

    const [team, setTeam] = useState({
        loading: true,
        data: {},
    });

    const { teamName } = useParams();

    useEffect(() => {
        const fetchMatches = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`);
            const data = await response.json();
            setTeam({
                loading: false,
                data: data,
            })
        }
        fetchMatches();
    }, [teamName]);

    // Loading State
    if (team.loading === true) return "Loading...";

    //Team Not found
    if (!team.data.teamName) return "Team Not Found";

    return (
        <div className="TeamPage">
            <div className="team-name-section">
                <h1 className="team-name">{team.data.teamName}</h1>
            </div>
            <div className="win-loss-section">
                Wins / Losses
                <PieChart
                    data={[
                        { title: 'Loss', value: team.data.totalMatches - team.data.totalWins, color: '#a34d5d' },
                        { title: 'Win', value: team.data.totalWins, color: '#4da375' },
                    ]}
                />
            </div>
            <div className="match-detail-section">
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.data.teamName} match={team.data.matches[0]} />
            </div>
            {team.data.matches.slice(1).map((match, idx) => <MatchSmallCard key={idx} teamName={team.data.teamName} match={match} />)}
            <div className="more-link">
                <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>{"More >"}</Link>
            </div>
        </div>
    )
}