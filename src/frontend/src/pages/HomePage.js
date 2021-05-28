import React, { useEffect, useState } from 'react'
import TeamTile from '../components/TeamTile';
import './HomePage.scss'

function HomePage() {

    const [teams, setTeams] = useState({
        loading: true,
        data: [],
    });

    useEffect(() => {
        const fetchAllTeams = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team`);
            const data = await response.json();
            setTeams({
                loading: false,
                data: data,
            })
        }
        fetchAllTeams();
    }, []);

    if (teams.loading === true) return 'Loading...';

    return (
        <div className="HomePage">
            <div className="header-section">
                <h1 className="app-name">SKT's IPL Dashboard</h1>
            </div>
            <div className="team-grid">
                {teams.data.map((team) => <TeamTile teamName={team.teamName} />)}
            </div>
        </div>
    )
}

export default HomePage
