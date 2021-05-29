import React, { useEffect, useState } from 'react'
import './TwoTeamStatsPage.scss'

function TwoTeamStatsPage() {

    const [teams, setTeams] = useState({
        loading: false,
        data: [],
    })

    const [matches, setMatches] = useState({
        loading: false,
        data: [],
    })

    useEffect(() => {
        const fetchTeams = async () => {

            setTeams({
                loading: true,
                data: []
            })

            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team`)
            const data = await response.json();

            setTeams({
                loading: false,
                data: data,
            })
        }
        fetchTeams();
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();
        let team1 = document.getElementById("team1").value;
        let team2 = document.getElementById("team2").value;

        const fetchMatches = async (team1, team2) => {

            setMatches({
                loading: true,
                data: [],
            });

            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/search?team1=${team1}&team2=${team2}`)
            const data = await response.json();
            console.log(data);

            setMatches({
                loading: false,
                data: data,
            })
        }
        fetchMatches(team1, team2);
    }

    const showMatches = () => {
        if (matches.loading === true) return "Loading";
        if (matches.data.length === 0) return "No Data";

        return (
            <div>
                {matches.data.map((match, idx) => (
                    <div style={{ margin: "1rem 0rem" }} key={idx}>
                        <p style={{ marginBottom: "0.2rem" }}>{match.venue}</p>
                        <p>{`${match.matchWinner} won by ${match.resultMargin} ${match.result}`}</p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="TwoTeamStatsPage">
            <h1>Select two teams: </h1>
            <form className="searchForm">
                <select name="cars" id="team1" style={{ width: "15rem" }}>
                    {teams.data.map((team, idx) => <option key={idx} value={team.teamName}>{team.teamName}</option>)}
                </select>
                <h3 style={{ margin: "0rem 0.5rem" }} >vs</h3>
                <select name="cars" id="team2" style={{ width: "15rem" }}>
                    {teams.data.map((team, idx) => <option key={idx} value={team.teamName}>{team.teamName}</option>)}
                </select>
                <input type="submit" value="search" onClick={(e) => onFormSubmit(e)} style={{ margin: "0rem 0.5rem" }} />
            </form>
            {showMatches()}
        </div>
    )
}

export default TwoTeamStatsPage
