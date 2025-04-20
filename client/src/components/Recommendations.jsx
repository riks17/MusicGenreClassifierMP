import React from "react";

// The Recommendations component that will accept data as a prop and display all recommendations
const Recommendations = ({ recommendations }) => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Song Recommendations</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recommendations && recommendations.length > 0 ? (
            recommendations.map((song, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Image of the song */}
                <img
                  src={song.image}
                  alt={song.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                
                {/* Song name and artist */}
                <h3 className="text-lg font-medium text-gray-900 mb-2">{song.name}</h3>
                <p className="text-gray-600 text-sm">{song.artist}</p>
                
                {/* Duration */}
                <p className="text-gray-500 text-xs">{`Duration: ${formatDuration(song.duration)}`}</p>

                {/* Link to the song */}
                <a
                  href={song.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-blue-600 hover:text-blue-800 text-sm"
                >
                  Listen on Spotify
                </a>
              </div>
            ))
          ) : (
            <p>No recommendations available</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to format the duration (in milliseconds) into a readable format
const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default Recommendations;
