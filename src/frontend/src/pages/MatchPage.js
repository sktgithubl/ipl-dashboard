import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import MatchDetailCard from '../components/MatchDetailCard';
import YearSelector from '../components/YearSelector';
import './MatchPage.scss';

function MatchPage() {

    const [matches, setMatches] = useState({
        loading: true,
        data: [],
    });
    const { teamName, year } = useParams();

    useEffect(() => {
        const fetchMatches = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`);
            const data = await response.json();
            setMatches({
                loading: false,
                data: data,
            })
            console.log(data);
        }
        fetchMatches();
    }, [teamName, year])

    //Loading
    if (matches.loading === true) return "Loading...";

    //team not found
    return (
        <div className="MatchPage">
            <div className="year-selector">
                <h3>Select Year</h3>
                <YearSelector teamName={teamName} />
            </div>
            <div>
                <h1 className="page-heading">{teamName} matches in {year}</h1>
                {
                    matches.data.map((match, idx) => <MatchDetailCard key={idx} teamName={teamName} match={match} />)
                }
            </div>
        </div>
    )
}

export default MatchPage
