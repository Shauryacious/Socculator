import React from 'react';
import { Button } from '@nextui-org/button'; // Assuming Button is coming from @nextui-org/button

export default function PredictedOutput({
  playerName,
  playerTeam,
  opponentTeam,
  status,
  model,
  resultLines,
  setSubmitted
}) {
  return (
    <div className="flex justify-center items-center min-h-screen  p-6">
      <div className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-white bg-opacity-90 backdrop-blur-md border border-gray-300" style={{position:'sticky',top:'0px',left:"0px"}}>
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-900">Prediction Result</h2>
        <p className="text-center text-gray-600 mb-6">Here are the details you submitted:</p>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-800 text-lg"><strong>Player Name:</strong> {playerName}</p>
          <p className="text-gray-800 text-lg"><strong>Player Team:</strong> {playerTeam}</p>
          <p className="text-gray-800 text-lg"><strong>Opponent Team:</strong> {opponentTeam}</p>
          <p className="text-gray-800 text-lg"><strong>Status:</strong> {status}</p>
          <p className="text-gray-800 text-lg"><strong>Model:</strong> {model}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Prediction Result:</h3>
          {resultLines.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {resultLines.map((line, index) => (
                <li key={index} className="text-gray-700 text-base">{line}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 text-base">No results available.</p>
          )}
        </div>

        <div className="text-center">
          <Button
            onClick={() => setSubmitted(false)}
            color="primary"
            size="lg"
            auto
            className="transition-transform transform hover:scale-105" 
            style={{background:'blue'}}
          >
            Back to Form
          </Button>
        </div>
      </div>
    </div>
  );
}
