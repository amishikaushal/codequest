import React from "react";
import "./TopPlayers.css"; // Common styles for leaderboard

const topPlayers = [
  { rank: 1, name: "Alice Johnson", score: 950 },
  { rank: 2, name: "Bob Smith", score: 920 },
  { rank: 3, name: "Charlie Brown", score: 880 },
];

const TopPlayers = () => {
  return (
    <section className="leaderboard-section">
      <h2 style={{color: "#6200ea"}}>🏆 Top Players</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {topPlayers.map((player, index) => (
            <tr key={index}>
              <td>{player.rank}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
              <td><button className="connect-btn">Connect</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TopPlayers;
