'use client';
import React from 'react';
import Droplist from '../components/Droplist';
import { Button } from '@nextui-org/button';
import findCountryCode from './flag'; // Assuming this function returns the country code

export default function FromInputs({
  players,
  availableTeamsForPlayerTeam,
  availableTeamsForOpponentTeam,
  statusArray,
  modelArray,
  setPlayerName,
  setPlayerTeam,
  setOpponentTeam,
  setStatus,
  setModel,
  handleSubmit,
  opponentTeam,
  playerTeam
}) {
  // Handle player team change and update the country codes
  const handlePlayerTeamChange = (team) => {
    setPlayerTeam(team);
    if (team === opponentTeam) {
      setOpponentTeam(''); // Clear opponent team if it matches
    }
  };

  // Handle opponent team change and update the country codes
  const handleOpponentTeamChange = (team) => {
    setOpponentTeam(team);
    if (team === playerTeam) {
      setPlayerTeam(''); // Clear player team if it matches
    }
  };

  // Filter teams to exclude the currently selected team in the opposite dropdown
  const filteredPlayerTeams = availableTeamsForPlayerTeam.filter((team) => team !== opponentTeam);
  const filteredOpponentTeams = availableTeamsForOpponentTeam.filter((team) => team !== playerTeam);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="shadow-xl rounded-lg p-8 bg-gray-700 bg-opacity-80 w-full max-w-4xl transition-all duration-300 ease-in-out transform hover:scale-105">
        
        {/* Teams */}
        <div className="flex items-center mb-8">
          <div className="flex-1 mr-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2">Select Your Team</label>
            <div className="flex justify-between items-center space-x-4">
              <Droplist list={filteredPlayerTeams} getvalue={handlePlayerTeamChange} PLACEHOLDER="Select Your Team" />
              <div className="flex justify-center mt-2">
                {playerTeam ? (
                  <img
                    src={`https://flagsapi.com/${findCountryCode(playerTeam)}/shiny/64.png`} // Using findCountryCode function
                    alt="My Team Flag"
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-gray-300">
                    No Flag
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mx-4 text-center text-gray-300 text-2xl font-bold">VS</div>

          <div className="flex-1 ml-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2">Select Opponent Team</label>
            <div className="flex justify-between items-center space-x-4">
              <div className="flex justify-center mt-2">
                {opponentTeam ? (
                  <img
                    src={`https://flagsapi.com/${findCountryCode(opponentTeam)}/flat/64.png`} // Using findCountryCode function
                    alt="Opponent Team Flag"
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-gray-300">
                    No Flag
                  </div>
                )}
              </div>
              <Droplist list={filteredOpponentTeams} getvalue={handleOpponentTeamChange} PLACEHOLDER="Select Opponent Team" />
            </div>
          </div>
        </div>

        {/* Player Name */}
        <label className="block text-gray-300 text-sm font-semibold mb-2">Select Player Name</label>
        <div className="mb-6">
          <Droplist list={players} getvalue={setPlayerName} PLACEHOLDER="Enter Player Name" />
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-semibold mb-2">Select Status</label>
          <Droplist list={statusArray} getvalue={setStatus} />
        </div>

        {/* Model */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-semibold mb-2">Select Model</label>
          <Droplist list={modelArray} getvalue={setModel} />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-8">
          <Button 
            onClick={handleSubmit} 
            color="primary" 
            size="lg" 
            auto
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-110"
          >
            Predict the Outcome
          </Button>
        </div>
      </div>
    </div>
  );
}
